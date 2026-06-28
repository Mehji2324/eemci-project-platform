<?php

namespace App\Policies;

use App\Models\Document;
use App\Models\User;

class DocumentPolicy
{
    /**
     * Admin has full access to everything.
     */
    public function before(User $user, $ability)
    {
        if ($user->isAdmin()) {
            return true;
        }
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // All authenticated users can list documents (filtered by repo).
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Document $document): bool
    {
        if ($user->isTeacher()) {
            // Teachers can see their own docs, plus maybe docs for their classes?
            // The prompt says "Teachers only manage their own documents."
            // For viewing, we allow them to see it if they uploaded it, or if it's public.
            return $document->uploaded_by === $user->id || $document->is_public;
        }

        if ($user->isStudent()) {
            // Student can view if it's public, or assigned to their class.
            return $document->is_public || $document->classe_id === $user->student->classe_id;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Teachers and Admins can create.
        return $user->isTeacher() || $user->isAdmin();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Document $document): bool
    {
        return $user->isTeacher() && $document->uploaded_by === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Document $document): bool
    {
        return $user->isTeacher() && $document->uploaded_by === $user->id;
    }
}
