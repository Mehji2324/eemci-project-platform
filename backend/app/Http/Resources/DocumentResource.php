<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'description' => $this->description,
            'type'        => $this->type,
            'mime_type'   => $this->mime_type,
            'size'        => $this->size,
            'download_count' => $this->download_count,
            'is_public'   => $this->is_public,
            'uploaded_by' => [
                'id'   => $this->uploader?->id,
                'name' => $this->uploader?->full_name,
            ],
            'classe'      => [
                'id'   => $this->classe?->id,
                'name' => $this->classe?->name,
            ],
            'module'      => [
                'id'   => $this->module?->id,
                'name' => $this->module?->name,
            ],
            'created_at'  => $this->created_at?->toIso8601String(),
            'updated_at'  => $this->updated_at?->toIso8601String(),
            // Don't expose physical file_path directly, clients should use the /download endpoint
        ];
    }
}
