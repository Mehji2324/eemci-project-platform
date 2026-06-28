<?php

namespace App\Http\Requests\Document;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Handled by DocumentPolicy
    }

    public function rules(): array
    {
        return [
            'title'       => ['sometimes', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'type'        => [
                'sometimes', 'string', 
                Rule::in([
                    'Course Material', 'Assignment', 'Practical Work', 'Exam', 
                    'Correction', 'School Certificate', 'Enrollment Certificate', 
                    'Transcript', 'Administrative Document'
                ])
            ],
            'file'        => ['sometimes', 'file', 'max:20480'], // 20MB max
            'classe_id'   => ['nullable', 'exists:classes,id'],
            'module_id'   => ['nullable', 'exists:modules,id'],
            'is_public'   => ['boolean'],
        ];
    }
}
