<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SettingPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any settings.
     */
    public function viewAny(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can update settings.
     */
    public function update(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can upload logo/favicon.
     */
    public function upload(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can test email.
     */
    public function testEmail(User $user): bool
    {
        return $user->isAdmin();
    }
}
