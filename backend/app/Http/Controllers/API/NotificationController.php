<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\NotificationService;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function index(Request $request)
    {
        $notifications = $this->notificationService->getNotifications(
            $request->user()->id
        );

        return response()->json($notifications);
    }

    public function markAsRead($id)
    {
        $notification = $this->notificationService->markAsRead($id);
        return response()->json($notification);
    }

    public function getUnreadCount(Request $request)
    {
        $count = $this->notificationService->getUnreadCount(
            $request->user()->id
        );

        return response()->json(['count' => $count]);
    }
}