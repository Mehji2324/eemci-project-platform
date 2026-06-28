<?php

namespace App\Http\Controllers;

use App\Http\Requests\Document\StoreDocumentRequest;
use App\Http\Requests\Document\UpdateDocumentRequest;
use App\Http\Resources\DocumentCollection;
use App\Http\Resources\DocumentResource;
use App\Models\Document;
use App\Services\DocumentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function __construct(
        protected DocumentService $documentService
    ) {}

    public function index(Request $request): DocumentCollection
    {
        Gate::authorize('viewAny', Document::class);

        $filters = $request->only(['search', 'type', 'classe_id', 'module_id', 'per_page']);
        
        $user = $request->user();
        if ($user->isTeacher()) {
            $filters['uploaded_by'] = $user->id; // Teachers only see their own docs here
        } elseif ($user->isStudent()) {
            $filters['student_classe_id'] = $user->student->classe_id; // Students see docs for their class or public
        }

        $documents = $this->documentService->getAll($filters);

        return new DocumentCollection($documents);
    }

    public function show(Request $request, Document $document): DocumentResource
    {
        Gate::authorize('view', $document);
        
        return new DocumentResource($document->load(['uploader', 'classe', 'module']));
    }

    public function store(StoreDocumentRequest $request): JsonResponse
    {
        Gate::authorize('create', Document::class);

        $data = $request->validated();
        $data['uploaded_by'] = $request->user()->id;

        $document = $this->documentService->createDocument($data, $request->file('file'));

        return response()->json([
            'success' => true,
            'message' => 'Document uploaded successfully.',
            'data'    => new DocumentResource($document),
        ], 201);
    }

    public function update(UpdateDocumentRequest $request, Document $document): JsonResponse
    {
        Gate::authorize('update', $document);

        $data = $request->validated();

        $updatedDocument = $this->documentService->updateDocument(
            $document->id, 
            $data, 
            $request->file('file') // nullable
        );

        return response()->json([
            'success' => true,
            'message' => 'Document updated successfully.',
            'data'    => new DocumentResource($updatedDocument),
        ]);
    }

    public function destroy(Request $request, Document $document): JsonResponse
    {
        Gate::authorize('delete', $document);

        $this->documentService->deleteDocument($document->id);

        return response()->json([
            'success' => true,
            'message' => 'Document deleted successfully.',
        ]);
    }

    public function download(Request $request, Document $document)
    {
        Gate::authorize('view', $document);

        if (! $document->file_path || ! Storage::disk('local')->exists($document->file_path)) {
            return response()->json([
                'success' => false,
                'message' => 'File not found.',
            ], 404);
        }

        $document->increment('download_count');

        $extension = pathinfo($document->file_path, PATHINFO_EXTENSION);
        $filename = \Illuminate\Support\Str::slug($document->title) . '.' . $extension;

        return Storage::disk('local')->download($document->file_path, $filename);
    }
}
