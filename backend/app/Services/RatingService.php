<?php

namespace App\Services;

use App\Models\Rating;
use App\Models\Tutor;
use App\Services\NotificationService;
use Illuminate\Support\Facades\DB;

class RatingService
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function createRating($data)
    {
        return DB::transaction(function () use ($data) {
            $rating = Rating::create([
                'tutor_id' => $data['tutor_id'],
                'guardian_id' => $data['guardian_id'],
                'tuition_id' => $data['tuition_id'],
                'rating' => $data['rating'],
                'review' => $data['review'],
                'teaching_quality' => $data['teaching_quality'] ?? null,
                'communication' => $data['communication'] ?? null,
                'punctuality' => $data['punctuality'] ?? null,
                'subject_expertise' => $data['subject_expertise'] ?? null
            ]);

            // Update tutor's average rating
            $this->updateTutorRating($data['tutor_id']);

            // Send notification
            $this->notificationService->send(
                $data['tutor_id'],
                'new_rating',
                'You received a new rating',
                ['rating_id' => $rating->id]
            );

            return $rating;
        });
    }

    public function updateTutorRating($tutorId)
    {
        $averageRating = Rating::where('tutor_id', $tutorId)
            ->avg('rating');

        Tutor::where('id', $tutorId)->update([
            'average_rating' => round($averageRating, 2),
            'total_ratings' => Rating::where('tutor_id', $tutorId)->count()
        ]);
    }

    public function getTutorRatings($tutorId, $page = 1, $perPage = 10)
    {
        return Rating::with('guardian')
            ->where('tutor_id', $tutorId)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);
    }

    public function getRatingMetrics($tutorId)
    {
        $ratings = Rating::where('tutor_id', $tutorId);

        return [
            'average_rating' => round($ratings->avg('rating'), 2),
            'total_ratings' => $ratings->count(),
            'rating_distribution' => [
                5 => $ratings->where('rating', 5)->count(),
                4 => $ratings->where('rating', 4)->count(),
                3 => $ratings->where('rating', 3)->count(),
                2 => $ratings->where('rating', 2)->count(),
                1 => $ratings->where('rating', 1)->count()
            ],
            'metrics' => [
                'teaching_quality' => round($ratings->avg('teaching_quality'), 2),
                'communication' => round($ratings->avg('communication'), 2),
                'punctuality' => round($ratings->avg('punctuality'), 2),
                'subject_expertise' => round($ratings->avg('subject_expertise'), 2)
            ]
        ];
    }

    public function reportReview($ratingId, $reason)
    {
        return DB::transaction(function () use ($ratingId, $reason) {
            $report = DB::table('rating_reports')->insert([
                'rating_id' => $ratingId,
                'reason' => $reason,
                'status' => 'pending',
                'created_at' => now()
            ]);

            // Notify admin
            $this->notificationService->send(
                'admin',
                'review_report',
                'New review report',
                ['rating_id' => $ratingId]
            );

            return $report;
        });
    }
}