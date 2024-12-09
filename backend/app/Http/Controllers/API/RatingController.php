<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\RatingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RatingController extends Controller
{
    protected $ratingService;

    public function __construct(RatingService $ratingService)
    {
        $this->ratingService = $ratingService;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tutor_id' => 'required|exists:tutors,id',
            'tuition_id' => 'required|exists:tuitions,id',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string|min:10',
            'teaching_quality' => 'nullable|integer|min:1|max:5',
            'communication' => 'nullable|integer|min:1|max:5',
            'punctuality' => 'nullable|integer|min:1|max:5',
            'subject_expertise' => 'nullable|integer|min:1|max:5'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $rating = $this->ratingService->createRating([
            'tutor_id' => $request->tutor_id,
            'guardian_id' => $request->user()->id,
            'tuition_id' => $request->tuition_id,
            'rating' => $request->rating,
            'review' => $request->review,
            'teaching_quality' => $request->teaching_quality,
            'communication' => $request->communication,
            'punctuality' => $request->punctuality,
            'subject_expertise' => $request->subject_expertise
        ]);

        return response()->json($rating);
    }

    public function getTutorRatings($tutorId, Request $request)
    {
        $page = $request->get('page', 1);
        $perPage = $request->get('per_page', 10);

        $ratings = $this->ratingService->getTutorRatings($tutorId, $page, $perPage);
        return response()->json($ratings);
    }

    public function getRatingMetrics($tutorId)
    {
        $metrics = $this->ratingService->getRatingMetrics($tutorId);
        return response()->json($metrics);
    }

    public function reportReview(Request $request, $ratingId)
    {
        $validator = Validator::make($request->all(), [
            'reason' => 'required|string|min:10'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $report = $this->ratingService->reportReview($ratingId, $request->reason);
        return response()->json($report);
    }
}