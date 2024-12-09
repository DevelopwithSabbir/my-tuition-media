<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AnalyticsService
{
    public function getDashboardMetrics()
    {
        return [
            'users' => $this->getUserMetrics(),
            'tuitions' => $this->getTuitionMetrics(),
            'revenue' => $this->getRevenueMetrics(),
            'platform' => $this->getPlatformMetrics()
        ];
    }

    private function getUserMetrics()
    {
        $now = Carbon::now();
        $monthStart = $now->startOfMonth();

        return [
            'total_tutors' => DB::table('tutors')->count(),
            'verified_tutors' => DB::table('tutors')->where('status', 'verified')->count(),
            'total_guardians' => DB::table('guardians')->count(),
            'new_users_this_month' => DB::table('tutors')
                ->where('created_at', '>=', $monthStart)
                ->count() + 
                DB::table('guardians')
                    ->where('created_at', '>=', $monthStart)
                    ->count(),
            'verification_pending' => DB::table('tutors')
                ->where('status', 'pending')
                ->count()
        ];
    }

    private function getTuitionMetrics()
    {
        return [
            'total_posts' => DB::table('tuition_posts')->count(),
            'active_tuitions' => DB::table('tuition_posts')
                ->where('status', 'approved')
                ->count(),
            'completed_tuitions' => DB::table('tuition_posts')
                ->where('status', 'completed')
                ->count(),
            'success_rate' => $this->calculateSuccessRate()
        ];
    }

    private function getRevenueMetrics()
    {
        $now = Carbon::now();
        $monthStart = $now->startOfMonth();
        $lastMonth = $now->subMonth()->startOfMonth();

        $currentMonthRevenue = DB::table('payments')
            ->where('status', 'completed')
            ->where('created_at', '>=', $monthStart)
            ->sum('amount');

        $lastMonthRevenue = DB::table('payments')
            ->where('status', 'completed')
            ->whereBetween('created_at', [$lastMonth, $monthStart])
            ->sum('amount');

        return [
            'total_revenue' => DB::table('payments')
                ->where('status', 'completed')
                ->sum('amount'),
            'current_month' => $currentMonthRevenue,
            'last_month' => $lastMonthRevenue,
            'growth_rate' => $this->calculateGrowthRate($currentMonthRevenue, $lastMonthRevenue)
        ];
    }

    private function getPlatformMetrics()
    {
        return [
            'average_response_time' => $this->calculateAverageResponseTime(),
            'demo_success_rate' => $this->calculateDemoSuccessRate(),
            'active_disputes' => DB::table('payment_disputes')
                ->where('status', 'pending')
                ->count(),
            'platform_health' => $this->calculatePlatformHealth()
        ];
    }

    private function calculateSuccessRate()
    {
        $total = DB::table('tuition_posts')->count();
        if ($total === 0) return 0;

        $successful = DB::table('tuition_posts')
            ->whereIn('status', ['approved', 'completed'])
            ->count();

        return round(($successful / $total) * 100, 2);
    }

    private function calculateGrowthRate($current, $previous)
    {
        if ($previous === 0) return 100;
        return round((($current - $previous) / $previous) * 100, 2);
    }

    private function calculateAverageResponseTime()
    {
        return DB::table('tutor_applications')
            ->whereNotNull('responded_at')
            ->avg(DB::raw('TIMESTAMPDIFF(HOUR, created_at, responded_at)'));
    }

    private function calculateDemoSuccessRate()
    {
        $total = DB::table('demo_classes')->count();
        if ($total === 0) return 0;

        $successful = DB::table('demo_classes')
            ->where('status', 'completed')
            ->count();

        return round(($successful / $total) * 100, 2);
    }

    private function calculatePlatformHealth()
    {
        // Factors: active users, payment success rate, dispute rate, response time
        $factors = [
            $this->getActiveUsersScore(),
            $this->getPaymentSuccessScore(),
            $this->getDisputeRateScore(),
            $this->getResponseTimeScore()
        ];

        return round(array_sum($factors) / count($factors), 2);
    }

    private function getActiveUsersScore()
    {
        $activeUsers = DB::table('users')
            ->where('last_active_at', '>=', now()->subDays(30))
            ->count();
        $totalUsers = DB::table('users')->count();

        return $totalUsers > 0 ? min(100, ($activeUsers / $totalUsers) * 100) : 0;
    }

    private function getPaymentSuccessScore()
    {
        $totalPayments = DB::table('payments')->count();
        if ($totalPayments === 0) return 100;

        $successfulPayments = DB::table('payments')
            ->where('status', 'completed')
            ->count();

        return ($successfulPayments / $totalPayments) * 100;
    }

    private function getDisputeRateScore()
    {
        $totalPayments = DB::table('payments')->count();
        if ($totalPayments === 0) return 100;

        $disputes = DB::table('payment_disputes')->count();
        $disputeRate = ($disputes / $totalPayments) * 100;

        return max(0, 100 - $disputeRate);
    }

    private function getResponseTimeScore()
    {
        $avgResponseTime = $this->calculateAverageResponseTime();
        if (!$avgResponseTime) return 100;

        // Consider 24 hours as baseline (100 points)
        return min(100, max(0, 100 - (($avgResponseTime - 24) / 24 * 100)));
    }
}