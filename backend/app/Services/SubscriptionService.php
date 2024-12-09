<?php

namespace App\Services;

use App\Models\TutorSubscription;
use Illuminate\Support\Facades\DB;

class SubscriptionService
{
    private $plans = [
        'basic' => [
            'price' => 500,
            'duration' => 30,
            'features' => [
                'profile_visibility',
                'apply_to_tuitions',
                'basic_analytics'
            ]
        ],
        'premium' => [
            'price' => 1000,
            'duration' => 30,
            'features' => [
                'profile_visibility',
                'apply_to_tuitions',
                'advanced_analytics',
                'featured_listing',
                'priority_applications',
                'instant_notifications'
            ]
        ],
        'professional' => [
            'price' => 2000,
            'duration' => 30,
            'features' => [
                'profile_visibility',
                'apply_to_tuitions',
                'advanced_analytics',
                'featured_listing',
                'priority_applications',
                'instant_notifications',
                'verified_badge',
                'marketing_tools',
                'dedicated_support'
            ]
        ]
    ];

    public function subscribe($tutorId, $plan)
    {
        if (!isset($this->plans[$plan])) {
            throw new \Exception('Invalid subscription plan');
        }

        return DB::transaction(function () use ($tutorId, $plan) {
            // Cancel any active subscription
            TutorSubscription::where('tutor_id', $tutorId)
                ->where('status', 'active')
                ->update(['status' => 'cancelled']);

            // Create new subscription
            $planDetails = $this->plans[$plan];
            return TutorSubscription::create([
                'tutor_id' => $tutorId,
                'plan' => $plan,
                'status' => 'active',
                'features' => $planDetails['features'],
                'started_at' => now(),
                'expires_at' => now()->addDays($planDetails['duration'])
            ]);
        });
    }

    public function getAvailablePlans()
    {
        return $this->plans;
    }

    public function cancelSubscription($subscriptionId)
    {
        return DB::transaction(function () use ($subscriptionId) {
            $subscription = TutorSubscription::findOrFail($subscriptionId);
            $subscription->update(['status' => 'cancelled']);
            return $subscription;
        });
    }

    public function hasFeature($tutorId, $feature)
    {
        $subscription = TutorSubscription::where('tutor_id', $tutorId)
            ->where('status', 'active')
            ->where('expires_at', '>', now())
            ->first();

        return $subscription && in_array($feature, $subscription->features);
    }
}