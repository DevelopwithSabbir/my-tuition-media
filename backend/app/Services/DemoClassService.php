<?php

namespace App\Services;

use App\Models\DemoClass;
use App\Services\NotificationService;
use Illuminate\Support\Facades\DB;

class DemoClassService
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function scheduleDemoClass($data)
    {
        return DB::transaction(function () use ($data) {
            $demoClass = DemoClass::create([
                'tutor_id' => $data['tutor_id'],
                'guardian_id' => $data['guardian_id'],
                'subject' => $data['subject'],
                'class' => $data['class'],
                'scheduled_at' => $data['scheduled_at'],
                'duration' => $data['duration'],
                'teaching_mode' => $data['teaching_mode'],
                'status' => 'pending'
            ]);

            // Send notifications
            $this->notificationService->sendDemoRequest(
                $data['tutor_id'],
                $data['guardian_id'],
                [
                    'demo_id' => $demoClass->id,
                    'subject' => $data['subject'],
                    'scheduled_at' => $data['scheduled_at']
                ]
            );

            return $demoClass;
        });
    }

    public function confirmDemoClass($demoId)
    {
        $demo = DemoClass::findOrFail($demoId);
        $demo->update(['status' => 'confirmed']);

        $this->notificationService->send(
            $demo->guardian_id,
            'demo_confirmed',
            'Demo class confirmed by tutor',
            ['demo_id' => $demoId]
        );

        return $demo;
    }

    public function rescheduleDemoClass($demoId, $newSchedule)
    {
        return DB::transaction(function () use ($demoId, $newSchedule) {
            $demo = DemoClass::findOrFail($demoId);
            
            // Store old schedule for notification
            $oldSchedule = $demo->scheduled_at;
            
            $demo->update([
                'scheduled_at' => $newSchedule['scheduled_at'],
                'status' => 'rescheduled'
            ]);

            // Notify both parties
            $this->notifyReschedule($demo, $oldSchedule);

            return $demo;
        });
    }

    public function completeDemoClass($demoId, $feedback)
    {
        return DB::transaction(function () use ($demoId, $feedback) {
            $demo = DemoClass::findOrFail($demoId);
            
            $demo->update([
                'status' => 'completed',
                'guardian_feedback' => $feedback['guardian_feedback'] ?? null,
                'tutor_feedback' => $feedback['tutor_feedback'] ?? null,
                'completed_at' => now()
            ]);

            // Create demo completion record
            $this->createDemoCompletion($demo, $feedback);

            return $demo;
        });
    }

    private function notifyReschedule($demo, $oldSchedule)
    {
        $notificationData = [
            'demo_id' => $demo->id,
            'old_schedule' => $oldSchedule,
            'new_schedule' => $demo->scheduled_at
        ];

        // Notify guardian
        $this->notificationService->send(
            $demo->guardian_id,
            'demo_rescheduled',
            'Demo class has been rescheduled',
            $notificationData
        );

        // Notify tutor
        $this->notificationService->send(
            $demo->tutor_id,
            'demo_rescheduled',
            'Demo class has been rescheduled',
            $notificationData
        );
    }

    private function createDemoCompletion($demo, $feedback)
    {
        return DB::table('demo_completions')->insert([
            'demo_class_id' => $demo->id,
            'guardian_rating' => $feedback['guardian_rating'] ?? null,
            'tutor_rating' => $feedback['tutor_rating'] ?? null,
            'guardian_feedback' => $feedback['guardian_feedback'] ?? null,
            'tutor_feedback' => $feedback['tutor_feedback'] ?? null,
            'created_at' => now()
        ]);
    }
}