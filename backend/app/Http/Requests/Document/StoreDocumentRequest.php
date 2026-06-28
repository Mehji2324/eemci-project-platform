<?php

namespace App\Http\Requests\Document;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Handled by DocumentPolicy
    }

    public function rules(): array
    {
        return [
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'type'        => [
                'required', 'string', 
                Rule::in([
                    'Course Material', 'Assignment', 'Practical Work', 'Exam', 
                    'Correction', 'School Certificate', 'Enrollment Certificate', 
                    'Transcript', 'Administrative Document'
                ])
            ],
            'file'        => ['required', 'file', 'max:20480'], // 20MB max
            'classe_id'   => ['nullable', 'exists:classes,id'],
            'module_id'   => ['nullable', 'exists:modules,id'],
            'is_public'   => ['boolean'],
        ];
    }
}
