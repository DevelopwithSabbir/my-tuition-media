<?php

namespace App\Services;

use App\Models\TuitionPost;
use App\Models\TutorApplication;
use Illuminate\Support\Facades\DB;

class TuitionService
{
    public function createPost($data)
    {
        return DB::transaction(function () use ($data) {
            return TuitionPost::create([
                'tuition_code' => 'T' . uniqid(),
                'guardian_mobile' => $data['guardian_mobile'],
                'student_gender' => $data['student_gender'],
                'class' => $data['class'],
                'subject' => $data['subject'],
                'version' => $data['version'],
                'days_per_week' => $data['days_per_week'],
                'salary' => $data['salary'],
                'location' => $data['location'],
                'tutor_requirements' => json_encode($data['tutor_requirements'])
            ]);
        });
    }

    public function applyForTuition($tutorId, $tuitionId)
    {
        return DB::transaction(function () use ($tutorId, $tuitionId) {
            $application = TutorApplication::create([
                'tutor_id' => $tutorId,
                'tuition_post_id' => $tuitionId,
                'status' => 'pending'
            ]);

            // Create activity log
            DB::table('activity_logs')->insert([
                'user_id' => $tutorId,
                'activity_type' => 'tuition_application',
                'description' => 'Applied for tuition',
                'created_at' => now()
            ]);

            return $application;
        });
    }

    public function updateApplicationStatus($applicationId, $status)
    {
        return DB::transaction(function () use ($applicationId, $status) {
            $application = TutorApplication::findOrFail($applicationId);
            $application->update(['status' => $status]);

            // Create activity log
            DB::table('activity_logs')->insert([
                'user_id' => $application->tutor_id,
                'activity_type' => 'application_status',
                'description' => "Application {$status}",
                'created_at' => now()
            ]);

            return $application;
        });
    }
}