import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import PaymentModal from './PaymentModal';

interface PaymentButtonProps {
  amount: number;
  purpose: string;
  onSuccess?: () => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ amount, purpose, onSuccess }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSuccess = () => {
    setTimeout(() => {
      setShowModal(false);
      onSuccess?.();
    }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <DollarSign className="w-5 h-5 mr-2" />
        Pay Now
      </button>

      {showModal && (
        <PaymentModal
          amount={amount}
          purpose={purpose}
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
};

export default PaymentButton;