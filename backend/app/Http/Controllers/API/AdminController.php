<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Tutor;
use App\Models\TuitionPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'total_tutors' => Tutor::count(),
            'pending_tutors' => Tutor::where('status', 'pending')->count(),
            'active_tutors' => Tutor::where('status', 'verified')->count(),
            'total_tuitions' => TuitionPost::count(),
            'pending_tuitions' => TuitionPost::where('status', 'pending')->count(),
            'active_tuitions' => TuitionPost::where('status', 'approved')->count(),
        ];

        $recent_activities = DB::table('activity_logs')
            ->latest()
            ->limit(10)
            ->get();

        return response()->json([
            'stats' => $stats,
            'recent_activities' => $recent_activities
        ]);
    }

    public function verifyTutor(Request $request, $id)
    {
        $tutor = Tutor::findOrFail($id);
        $tutor->update(['status' => 'verified']);

        return response()->json([
            'message' => 'Tutor verified successfully',
            'tutor' => $tutor
        ]);
    }

    public function rejectTutor(Request $request, $id)
    {
        $tutor = Tutor::findOrFail($id);
        $tutor->update(['status' => 'rejected']);

        return response()->json([
            'message' => 'Tutor rejected',
            'tutor' => $tutor
        ]);
    }

    public function approveTuition(Request $request, $id)
    {
        $post = TuitionPost::findOrFail($id);
        $post->update(['status' => 'approved']);

        return response()->json([
            'message' => 'Tuition post approved',
            'post' => $post
        ]);
    }

    public function rejectTuition(Request $request, $id)
    {
        $post = TuitionPost::findOrFail($id);
        $post->update(['status' => 'rejected']);

        return response()->json([
            'message' => 'Tuition post rejected',
            'post' => $post
        ]);
    }
}