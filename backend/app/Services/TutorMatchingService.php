<?php

namespace App\Services;

class TutorMatchingService
{
    public function findMatches($requirements)
    {
        $query = Tutor::query()
            ->where('status', 'verified')
            ->where('profile_complete', '>=', 80);

        // Location matching
        if (!empty($requirements['location'])) {
            $query->where(function($q) use ($requirements) {
                $q->where('current_city', 'like', "%{$requirements['location']}%")
                  ->orWhereJsonContains('preferred_locations', $requirements['location']);
            });
        }

        // Subject matching
        if (!empty($requirements['subject'])) {
            $query->whereJsonContains('preferred_subjects', $requirements['subject']);
        }

        // Class matching
        if (!empty($requirements['class'])) {
            $query->whereJsonContains('preferred_classes', $requirements['class']);
        }

        // Salary range matching
        if (!empty($requirements['salary_range'])) {
            $query->whereBetween('expected_salary', $requirements['salary_range']);
        }

        // Calculate match score
        return $query->get()->map(function($tutor) use ($requirements) {
            $score = $this->calculateMatchScore($tutor, $requirements);
            return [
                'tutor' => $tutor,
                'match_score' => $score,
                'match_reasons' => $this->getMatchReasons($tutor, $requirements)
            ];
        })->sortByDesc('match_score');
    }

    private function calculateMatchScore($tutor, $requirements)
    {
        $score = 0;

        // Location match (30%)
        if ($this->isLocationMatch($tutor, $requirements['location'])) {
            $score += 30;
        }

        // Subject expertise (25%)
        if ($this->isSubjectMatch($tutor, $requirements['subject'])) {
            $score += 25;
        }

        // Teaching experience (20%)
        $score += $this->getExperienceScore($tutor) * 20;

        // Rating and reviews (15%)
        $score += $this->getRatingScore($tutor) * 15;

        // Availability match (10%)
        if ($this->isAvailabilityMatch($tutor, $requirements)) {
            $score += 10;
        }

        return $score;
    }

    private function getMatchReasons($tutor, $requirements)
    {
        $reasons = [];

        if ($this->isLocationMatch($tutor, $requirements['location'])) {
            $reasons[] = "Located in your preferred area";
        }

        if ($this->isSubjectMatch($tutor, $requirements['subject'])) {
            $reasons[] = "Expert in {$requirements['subject']}";
        }

        if ($tutor->rating >= 4.5) {
            $reasons[] = "Highly rated tutor";
        }

        if ($tutor->experience_years >= 2) {
            $reasons[] = "Experienced teacher";
        }

        return $reasons;
    }

    private function isLocationMatch($tutor, $location)
    {
        return $tutor->current_city === $location || 
               in_array($location, $tutor->preferred_locations);
    }

    private function isSubjectMatch($tutor, $subject)
    {
        return in_array($subject, $tutor->preferred_subjects);
    }

    private function getExperienceScore($tutor)
    {
        if ($tutor->experience_years >= 3) return 1;
        if ($tutor->experience_years >= 2) return 0.8;
        if ($tutor->experience_years >= 1) return 0.6;
        return 0.4;
    }

    private function getRatingScore($tutor)
    {
        if ($tutor->rating >= 4.5) return 1;
        if ($tutor->rating >= 4.0) return 0.8;
        if ($tutor->rating >= 3.5) return 0.6;
        return 0.4;
    }

    private function isAvailabilityMatch($tutor, $requirements)
    {
        return !empty(array_intersect(
            $tutor->available_days,
            $requirements['preferred_days'] ?? []
        ));
    }
}