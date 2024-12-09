import React, { useState } from 'react';
import { CreditCard, Smartphone, X, CheckCircle } from 'lucide-react';

interface PaymentModalProps {
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
  purpose: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ amount, onClose, onSuccess, purpose }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [step, setStep] = useState(1);

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', logo: '/bkash-logo.png', number: '01821702694' },
    { id: 'nagad', name: 'Nagad', logo: '/nagad-logo.png', number: '01821702694' },
    { id: 'rocket', name: 'Rocket', logo: '/rocket-logo.png', number: '01821702694' },
    { id: 'card', name: 'Card Payment', icon: CreditCard }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, verify the transaction with the payment provider
    setStep(3);
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Payment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">৳{amount}</p>
                <p className="text-gray-600 mt-1">{purpose}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    onClick={() => {
                      setPaymentMethod(method.id);
                      if (method.id !== 'card') setStep(2);
                    }}
                    className={`p-4 border rounded-xl flex flex-col items-center justify-center space-y-2 hover:border-indigo-500 transition-colors ${
                      paymentMethod === method.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                    }`}
                  >
                    {method.icon ? (
                      <method.icon className="w-8 h-8 text-gray-600" />
                    ) : (
                      <img src={method.logo} alt={method.name} className="h-8" />
                    )}
                    <span className="text-sm font-medium text-gray-900">{method.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg text-sm">
                <p className="font-medium text-gray-900">Instructions:</p>
                <ol className="mt-2 space-y-2 text-gray-600">
                  <li>1. Send money to: {paymentMethods.find(m => m.id === paymentMethod)?.number}</li>
                  <li>2. Enter your mobile number and transaction ID below</li>
                  <li>3. Click verify to complete payment</li>
                </ol>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="01XXXXXXXXX"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter transaction ID"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700"
              >
                Verify Payment
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">Payment Successful!</h3>
              <p className="text-gray-600 mt-2">Your payment has been processed successfully.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;