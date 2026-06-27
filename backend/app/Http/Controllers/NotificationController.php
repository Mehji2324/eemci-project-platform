<?php

namespace App\Http\Controllers;

use App\Http\Requests\Notification\IndexNotificationRequest;
use App\Http\Resources\NotificationCollection;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class NotificationController extends Controller
{
    /**
     * GET /api/v1/notifications
     *
     * List authenticated user's notifications with filtering, search, sorting, and pagination.
     */
    public function index(IndexNotificationRequest $request): NotificationCollection
    {
        Gate::authorize('viewAny', Notification::class);

        $notifications = Notification::where('user_id', $request->user()->id)
            ->when($request->type, fn($q, $type) => $q->ofType($type))
            ->when($request->has('is_read'), fn($q) => $q->where('is_read', $request->boolean('is_read')))
            ->search($request->search)
            ->orderBy(
                $request->get('sort_by', 'created_at'),
                $request->get('sort_dir', 'desc')
            )
            ->paginate(min(max((int) $request->get('per_page', 20), 1), 100));

        return new NotificationCollection($notifications);
    }

    /**
     * GET /api/v1/notifications/unread
     *
     * List only unread notifications for the authenticated user.
     */
    public function unread(IndexNotificationRequest $request): JsonResponse
    {
        Gate::authorize('viewAny', Notification::class);

        $notifications = Notification::where('user_id', $request->user()->id)
            ->unread()
            ->when($request->type, fn($q, $type) => $q->ofType($type))
            ->search($request->search)
            ->orderBy(
                $request->get('sort_by', 'created_at'),
                $request->get('sort_dir', 'desc')
            )
            ->paginate(min(max((int) $request->get('per_page', 20), 1), 100));

        return response()->json([
            'success'      => true,
            'message'      => 'Success',
            'data'         => NotificationResource::collection($notifications),
            'unread_count' => Notification::where('user_id', $request->user()->id)->unread()->count(),
            'meta'         => [
                'current_page' => $notifications->currentPage(),
                'last_page'    => $notifications->lastPage(),
                'per_page'     => $notifications->perPage(),
                'total'        => $notifications->total(),
            ],
        ]);
    }

    /**
     * PATCH /api/v1/notifications/{notification}/read
     *
     * Mark a single notification as read.
     */
    public function markAsRead(Request $request, Notification $notification): JsonResponse
    {
        Gate::authorize('update', $notification);

        $notification->markAsRead();

        return response()->json([
            'success' => true,
            'message' => 'Notification marked as read.',
            'data'    => new NotificationResource($notification),
        ]);
    }

    /**
     * PATCH /api/v1/notifications/read-all
     *
     * Mark all of the authenticated user's notifications as read.
     */
    public function markAllAsRead(Request $request): JsonResponse
    {
        $count = Notification::where('user_id', $request->user()->id)
            ->unread()
            ->update(['is_read' => true]);

        return response()->json([
            'success' => true,
            'message' => "{$count} notification(s) marked as read.",
            'data'    => ['updated_count' => $count],
        ]);
    }

    /**
     * DELETE /api/v1/notifications/{notification}
     *
     * Delete a single notification.
     */
    public function destroy(Request $request, Notification $notification): JsonResponse
    {
        Gate::authorize('delete', $notification);

        $notification->delete();

        return response()->json([
            'success' => true,
            'message' => 'Notification deleted.',
        ]);
    }
}
