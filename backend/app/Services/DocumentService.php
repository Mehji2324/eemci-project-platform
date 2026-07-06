<?php

namespace App\Services;

use App\Repositories\Contracts\DocumentRepositoryInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DocumentService
{
    public function __construct(
        protected DocumentRepositoryInterface $documentRepo
    ) {}

    public function getAll(array $filters = [])
    {
        return $this->documentRepo->all($filters);
    }

    public function getById(int $id)
    {
        return $this->documentRepo->find($id);
    }

    public function createDocument(array $data, UploadedFile $file)
    {
        // Store the file securely (local disk, not public, to control access)
        $path = $file->storeAs('documents', Str::uuid() . '.' . $file->getClientOriginalExtension(), 'local');
        
        $data['file_path'] = $path;
        $data['mime_type'] = $file->getClientMimeType();
        $data['size']      = $file->getSize();
        
        return $this->documentRepo->create($data);
    }

    public function updateDocument(int $id, array $data, ?UploadedFile $file = null)
    {
        if ($file) {
            $document = $this->documentRepo->find($id);
            $oldFilePath = $document->file_path;
            
            // Store new file
            $path = $file->storeAs('documents', Str::uuid() . '.' . $file->getClientOriginalExtension(), 'local');
            $data['file_path'] = $path;
            $data['mime_type'] = $file->getClientMimeType();
            $data['size']      = $file->getSize();
            
            $updated = $this->documentRepo->update($id, $data);
            
            // Delete old file only after DB updates successfully
            if ($updated && $oldFilePath && Storage::disk('local')->exists($oldFilePath)) {
                Storage::disk('local')->delete($oldFilePath);
            }
            return $updated;
        }

        return $this->documentRepo->update($id, $data);
    }

    public function deleteDocument(int $id)
    {
        return $this->documentRepo->delete($id);
    }
}
