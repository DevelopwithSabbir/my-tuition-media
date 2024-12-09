<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\TutorController;
use App\Http\Controllers\API\TuitionController;
use App\Http\Controllers\API\AdminController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // User routes
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Tutor routes
    Route::get('/tutors', [TutorController::class, 'index']);
    Route::get('/tutors/{id}', [TutorController::class, 'show']);
    Route::put('/tutors/profile', [TutorController::class, 'updateProfile']);
    Route::put('/tutors/education', [TutorController::class, 'updateEducation']);

    // Tuition routes
    Route::get('/tuitions', [TuitionController::class, 'index']);
    Route::post('/tuitions', [TuitionController::class, 'store']);
    Route::put('/tuitions/{id}', [TuitionController::class, 'update']);
    Route::patch('/tuitions/{id}/status', [TuitionController::class, 'updateStatus']);

    // Admin routes
    Route::middleware('admin')->group(function () {
        Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
        Route::post('/admin/tutors/{id}/verify', [AdminController::class, 'verifyTutor']);
        Route::post('/admin/tutors/{id}/reject', [AdminController::class, 'rejectTutor']);
        Route::post('/admin/tuitions/{id}/approve', [AdminController::class, 'approveTuition']);
        Route::post('/admin/tuitions/{id}/reject', [AdminController::class, 'rejectTuition']);
    });
});