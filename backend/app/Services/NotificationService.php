<?php

namespace App\Services;

use App\Models\Notification;
use App\Events\NewNotification;
use Illuminate\Support\Facades\DB;

class NotificationService
{
    public function send($userId, $type, $message, $data = [])
    {
        return DB::transaction(function () use ($userId, $type, $message, $data) {
            $notification = Notification::create([
                'user_id' => $userId,
                'type' => $type,
                'message' => $message,
                'data' => json_encode($data),
                'read_at' => null
            ]);

            // Broadcast notification
            broadcast(new NewNotification($notification))->toOthers();

            return $notification;
        });
    }

    public function markAsRead($notificationId)
    {
        $notification = Notification::findOrFail($notificationId);
        $notification->update(['read_at' => now()]);
        return $notification;
    }

    public function getUnreadCount($userId)
    {
        return Notification::where('user_id', $userId)
            ->whereNull('read_at')
            ->count();
    }

    public function getNotifications($userId, $limit = 10)
    {
        return Notification::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    public function sendDemoRequest($tutorId, $guardianId, $demoDetails)
    {
        $this->send($tutorId, 'demo_request', 'New demo class request', [
            'guardian_id' => $guardianId,
            'demo_details' => $demoDetails
        ]);
    }

    public function sendPaymentConfirmation($userId, $amount, $purpose)
    {
        $this->send($userId, 'payment_confirmation', 'Payment confirmed', [
            'amount' => $amount,
            'purpose' => $purpose,
            'date' => now()->toDateTimeString()
        ]);
    }

    public function sendTuitionConfirmation($tutorId, $guardianId, $tuitionDetails)
    {
        $this->send($tutorId, 'tuition_confirmed', 'New tuition confirmed', [
            'guardian_id' => $guardianId,
            'tuition_details' => $tuitionDetails
        ]);

        $this->send($guardianId, 'tuition_confirmed', 'Tuition confirmation', [
            'tutor_id' => $tutorId,
            'tuition_details' => $tuitionDetails
        ]);
    }
}