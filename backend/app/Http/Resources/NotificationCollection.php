<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class NotificationCollection extends ResourceCollection
{
    /**
     * The resource that this resource collects.
     */
    public $collects = NotificationResource::class;

    /**
     * Transform the resource collection into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection,
        ];
    }

    /**
     * Add additional data to the resource response.
     */
    public function with(Request $request): array
    {
        return [
            'success' => true,
            'message' => 'Success',
        ];
    }
}
