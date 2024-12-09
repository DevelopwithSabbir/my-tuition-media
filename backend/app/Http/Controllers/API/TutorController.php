<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Tutor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TutorController extends Controller
{
    public function index()
    {
        $tutors = Tutor::with('education')->get();
        return response()->json($tutors);
    }

    public function show($id)
    {
        $tutor = Tutor::with('education')->findOrFail($id);
        return response()->json($tutor);
    }

    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_city' => 'required|string',
            'current_area' => 'required|string',
            'about' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $tutor = $request->user();
        $tutor->update($request->all());

        return response()->json([
            'message' => 'Profile updated successfully',
            'tutor' => $tutor
        ]);
    }

    public function updateEducation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'education' => 'required|array',
            'education.*.level' => 'required|string',
            'education.*.institute' => 'required|string',
            'education.*.curriculum' => 'required|string',
            'education.*.passing_year' => 'required|string',
            'education.*.result' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $tutor = $request->user();
        $tutor->education()->delete();
        $tutor->education()->createMany($request->education);

        return response()->json([
            'message' => 'Education details updated successfully',
            'education' => $tutor->education
        ]);
    }
}