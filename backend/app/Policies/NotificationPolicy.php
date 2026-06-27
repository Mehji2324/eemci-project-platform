<?php

namespace App\Policies;

use App\Models\Notification;
use App\Models\User;

class NotificationPolicy
{
    /**
     * Users can only view their own notifications.
     */
    public function viewAny(User $user): bool
    {
        return true; // All authenticated users can list their own notifications.
    }

    /**
     * Users can only view a notification they own.
     */
    public function view(User $user, Notification $notification): bool
    {
        return $user->id === $notification->user_id;
    }

    /**
     * Users can only mark their own notifications as read.
     */
    public function update(User $user, Notification $notification): bool
    {
        return $user->id === $notification->user_id;
    }

    /**
     * Users can only delete their own notifications.
     */
    public function delete(User $user, Notification $notification): bool
    {
        return $user->id === $notification->user_id;
    }
}
