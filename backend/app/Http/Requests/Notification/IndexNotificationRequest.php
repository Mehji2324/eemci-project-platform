<?php

namespace App\Http\Requests\Notification;

use Illuminate\Foundation\Http\FormRequest;

class IndexNotificationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type'     => ['sometimes', 'string', 'max:50'],
            'is_read'  => ['sometimes', 'boolean'],
            'search'   => ['sometimes', 'string', 'max:255'],
            'sort_by'  => ['sometimes', 'string', 'in:created_at,type,is_read'],
            'sort_dir' => ['sometimes', 'string', 'in:asc,desc'],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:100'],
        ];
    }
}
