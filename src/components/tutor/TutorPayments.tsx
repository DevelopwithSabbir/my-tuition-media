import React, { useState } from 'react';
import { DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import PaymentButton from '../payment/PaymentButton';

const TutorPayments = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      amount: 500,
      purpose: 'Profile Verification Fee',
      status: 'pending',
      dueDate: '2024-02-15'
    }
  ]);

  const handlePaymentSuccess = (paymentId: number) => {
    setPayments(prev =>
      prev.map(payment =>
        payment.id === paymentId
          ? { ...payment, status: 'completed' }
          : payment
      )
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Payments</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-sm text-gray-500">Total Paid</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">৳0</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm text-gray-500">Pending</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">৳500</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-gray-500">Completed</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">৳0</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment History</h3>

          <div className="space-y-6">
            {payments.map(payment => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{payment.purpose}</h4>
                  <p className="text-sm text-gray-500">Due: {payment.dueDate}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-medium text-gray-900">৳{payment.amount}</p>
                  {payment.status === 'pending' ? (
                    <PaymentButton
                      amount={payment.amount}
                      purpose={payment.purpose}
                      onSuccess={() => handlePaymentSuccess(payment.id)}
                    />
                  ) : (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Paid
                    </span>
                  )}
                </div>
              </div>
            ))}

            {payments.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No Payments</h3>
                <p className="text-gray-500">You don't have any pending payments</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorPayments;