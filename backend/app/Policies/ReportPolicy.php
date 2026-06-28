<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ReportPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any reports.
     */
    public function viewAnyReport(User $user)
    {
        // Admin has full access, Teachers and Students have scoped access
        return in_array($user->role, ['admin', 'teacher', 'student']);
    }
}
