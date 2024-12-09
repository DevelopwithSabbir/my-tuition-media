<?php

namespace App\Services;

use App\Models\Tutor;
use App\Models\TutorEducation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TutorService
{
    public function register($data)
    {
        DB::beginTransaction();
        try {
            $tutor = Tutor::create([
                'tutor_id' => 'T' . uniqid(),
                'name' => $data['name'],
                'email' => $data['email'],
                'mobile' => $data['mobile'],
                'password' => Hash::make($data['password']),
                'gender' => $data['gender'],
                'profile_complete' => 22
            ]);

            if (isset($data['education'])) {
                foreach ($data['education'] as $edu) {
                    TutorEducation::create([
                        'tutor_id' => $tutor->id,
                        'level' => $edu['level'],
                        'institute' => $edu['institute'],
                        'curriculum' => $edu['curriculum'],
                        'passing_year' => $edu['passingYear'],
                        'result' => $edu['result']
                    ]);
                }
            }

            DB::commit();
            return $tutor;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function updateProfile($tutor, $data)
    {
        DB::beginTransaction();
        try {
            $tutor->update([
                'about' => $data['about'] ?? $tutor->about,
                'current_city' => $data['currentCity'] ?? $tutor->current_city,
                'current_area' => $data['currentArea'] ?? $tutor->current_area,
                'profile_complete' => $this->calculateProfileCompletion($tutor, $data)
            ]);

            if (isset($data['education'])) {
                $tutor->education()->delete();
                foreach ($data['education'] as $edu) {
                    $tutor->education()->create($edu);
                }
            }

            DB::commit();
            return $tutor->fresh();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    private function calculateProfileCompletion($tutor, $data): int
    {
        $total = 0;
        $fields = 0;

        // Basic info
        $basicFields = ['name', 'email', 'mobile', 'gender', 'about', 'current_city'];
        foreach ($basicFields as $field) {
            $fields++;
            if (!empty($tutor->$field)) $total++;
        }

        // Education
        if ($tutor->education()->count() > 0) {
            $total += 2;
        }
        $fields += 2;

        // Documents
        if (!empty($tutor->documents)) {
            $total++;
        }
        $fields++;

        return round(($total / $fields) * 100);
    }
}