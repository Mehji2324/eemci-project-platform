<?php

namespace App\Repositories\Eloquent;

use App\Models\Document;
use App\Repositories\Contracts\DocumentRepositoryInterface;
use Illuminate\Support\Facades\Storage;

class EloquentDocumentRepository implements DocumentRepositoryInterface
{
    public function all(array $filters = [])
    {
        $query = Document::with(['uploader', 'classe', 'module']);

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('title', 'like', "%{$filters['search']}%")
                  ->orWhere('description', 'like', "%{$filters['search']}%");
            });
        }

        if (isset($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        if (isset($filters['classe_id'])) {
            $query->where('classe_id', $filters['classe_id']);
        }

        if (isset($filters['module_id'])) {
            $query->where('module_id', $filters['module_id']);
        }
        
        if (isset($filters['uploaded_by'])) {
            $query->where('uploaded_by', $filters['uploaded_by']);
        }

        // Handle permissions for students: 
        // Must be public OR belong to the student's class
        if (isset($filters['student_classe_id'])) {
            $query->where(function($q) use ($filters) {
                $q->where('is_public', true)
                  ->orWhere('classe_id', $filters['student_classe_id']);
            });
        }

        return $query->latest()->paginate($filters['per_page'] ?? 20);
    }

    public function find(int $id)
    {
        return Document::with(['uploader', 'classe', 'module'])->findOrFail($id);
    }

    public function create(array $data)
    {
        return Document::create($data);
    }

    public function update(int $id, array $data)
    {
        $document = $this->find($id);
        $document->update($data);
        return $document->fresh();
    }

    public function delete(int $id)
    {
        $document = $this->find($id);
        
        if ($document->file_path && Storage::disk('local')->exists($document->file_path)) {
            Storage::disk('local')->delete($document->file_path);
        }
        
        return $document->delete();
    }
}
