<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function processPayment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string',
            'transaction_id' => 'required|string|unique:payments',
            'purpose' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $payment = $this->paymentService->processPayment([
            'amount' => $request->amount,
            'payment_method' => $request->payment_method,
            'transaction_id' => $request->transaction_id,
            'payer_id' => $request->user()->id,
            'payer_type' => $request->user()->type,
            'purpose' => $request->purpose
        ]);

        return response()->json($payment);
    }

    public function verifyPayment($paymentId)
    {
        $payment = $this->paymentService->verifyPayment($paymentId);
        return response()->json($payment);
    }

    public function createDispute(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'payment_id' => 'required|exists:payments,id',
            'reason' => 'required|string',
            'description' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $dispute = $this->paymentService->createDispute([
            'payment_id' => $request->payment_id,
            'user_id' => $request->user()->id,
            'reason' => $request->reason,
            'description' => $request->description
        ]);

        return response()->json($dispute);
    }
}