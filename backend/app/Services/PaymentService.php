<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\PaymentDispute;
use App\Services\NotificationService;
use Illuminate\Support\Facades\DB;

class PaymentService
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function processPayment($data)
    {
        return DB::transaction(function () use ($data) {
            $payment = Payment::create([
                'amount' => $data['amount'],
                'payment_method' => $data['payment_method'],
                'transaction_id' => $data['transaction_id'],
                'status' => 'pending',
                'payer_id' => $data['payer_id'],
                'payer_type' => $data['payer_type'],
                'purpose' => $data['purpose'],
                'commission' => $this->calculateCommission($data['amount']),
                'tutor_amount' => $this->calculateTutorAmount($data['amount'])
            ]);

            // Create payment breakdown
            $this->createPaymentBreakdown($payment);

            // Send notifications
            $this->notificationService->sendPaymentConfirmation(
                $data['payer_id'],
                $data['amount'],
                $data['purpose']
            );

            return $payment;
        });
    }

    public function verifyPayment($paymentId)
    {
        return DB::transaction(function () use ($paymentId) {
            $payment = Payment::findOrFail($paymentId);
            $payment->update(['status' => 'completed']);

            // Update tutor's balance
            if ($payment->purpose === 'tuition_fee') {
                $this->updateTutorBalance($payment->tutor_id, $payment->tutor_amount);
            }

            return $payment;
        });
    }

    public function createDispute($data)
    {
        return DB::transaction(function () use ($data) {
            $dispute = PaymentDispute::create([
                'payment_id' => $data['payment_id'],
                'user_id' => $data['user_id'],
                'reason' => $data['reason'],
                'description' => $data['description'],
                'status' => 'pending'
            ]);

            // Notify admin
            $this->notificationService->send(
                'admin',
                'payment_dispute',
                'New payment dispute created',
                ['dispute_id' => $dispute->id]
            );

            return $dispute;
        });
    }

    private function calculateCommission($amount)
    {
        return $amount * 0.10; // 10% commission
    }

    private function calculateTutorAmount($amount)
    {
        return $amount * 0.90; // 90% for tutor
    }

    private function createPaymentBreakdown($payment)
    {
        return DB::table('payment_breakdowns')->insert([
            'payment_id' => $payment->id,
            'total_amount' => $payment->amount,
            'platform_commission' => $payment->commission,
            'tutor_amount' => $payment->tutor_amount,
            'created_at' => now()
        ]);
    }

    private function updateTutorBalance($tutorId, $amount)
    {
        DB::table('tutor_balances')
            ->where('tutor_id', $tutorId)
            ->increment('available_balance', $amount);
    }
}