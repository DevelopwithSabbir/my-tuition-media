<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\TuitionPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TuitionController extends Controller
{
    public function index()
    {
        $posts = TuitionPost::where('status', 'approved')->latest()->get();
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'guardian_mobile' => 'required|string',
            'student_gender' => 'required|string',
            'class' => 'required|string',
            'subject' => 'required|string',
            'version' => 'required|string',
            'days_per_week' => 'required|integer',
            'salary' => 'required|numeric',
            'location' => 'required|string',
            'tutor_requirements' => 'required|array'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $post = TuitionPost::create([
            'tuition_code' => 'T' . uniqid(),
            ...$request->all()
        ]);

        return response()->json([
            'message' => 'Tuition post created successfully',
            'post' => $post
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $post = TuitionPost::findOrFail($id);
        $post->update($request->all());

        return response()->json([
            'message' => 'Tuition post updated successfully',
            'post' => $post
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:approved,rejected,cancelled'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $post = TuitionPost::findOrFail($id);
        $post->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Status updated successfully',
            'post' => $post
        ]);
    }
}