<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\DemoClassService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DemoClassController extends Controller
{
    protected $demoClassService;

    public function __construct(DemoClassService $demoClassService)
    {
        $this->demoClassService = $demoClassService;
    }

    public function schedule(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tutor_id' => 'required|exists:tutors,id',
            'subject' => 'required|string',
            'class' => 'required|string',
            'scheduled_at' => 'required|date|after:now',
            'duration' => 'required|integer|min:30|max:120',
            'teaching_mode' => 'required|in:online,offline'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $demoClass = $this->demoClassService->scheduleDemoClass([
            'tutor_id' => $request->tutor_id,
            'guardian_id' => $request->user()->id,
            'subject' => $request->subject,
            'class' => $request->class,
            'scheduled_at' => $request->scheduled_at,
            'duration' => $request->duration,
            'teaching_mode' => $request->teaching_mode
        ]);

        return response()->json($demoClass);
    }

    public function confirm($id)
    {
        $demoClass = $this->demoClassService->confirmDemoClass($id);
        return response()->json($demoClass);
    }

    public function reschedule(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'scheduled_at' => 'required|date|after:now'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $demoClass = $this->demoClassService->rescheduleDemoClass($id, [
            'scheduled_at' => $request->scheduled_at
        ]);

        return response()->json($demoClass);
    }

    public function complete(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'guardian_feedback' => 'nullable|string',
            'tutor_feedback' => 'nullable|string',
            'guardian_rating' => 'nullable|integer|min:1|max:5',
            'tutor_rating' => 'nullable|integer|min:1|max:5'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $demoClass = $this->demoClassService->completeDemoClass($id, $request->all());
        return response()->json($demoClass);
    }
}