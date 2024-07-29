import React, { useState } from 'react';
import axios from 'axios';

interface BuyTicketModalProps {
  eventId: number;
  onClose: () => void;
}

const BuyTicketModal: React.FC<BuyTicketModalProps> = ({ eventId, onClose }) => {
  const [ticketAmount, setTicketAmount] = useState(1);
  const [useCoupon, setUseCoupon] = useState(false);
  const [usePoints, setUsePoints] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuyTicket = async () => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL + 'transaction/buy-ticket', {
        eventId,
        ticketAmount,
        useCoupon,
        usePoints,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 201) {
        const { subtotal } = response.data.transaction;
        alert(`Tickets purchased successfully. Total price: Rp ${subtotal}`);
        onClose();
      }
    } catch (err) {
      setError('Failed to purchase tickets');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto max-h-[80vh] relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-semibold mb-4">Buy Ticket</h2>
        {error && <p className="error">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Ticket Amount:
            <input
              type="number"
              value={ticketAmount}
              onChange={(e) => setTicketAmount(Number(e.target.value))}
              min="1"
              className="border border-gray-300 rounded-lg p-3 w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              checked={useCoupon}
              onChange={() => setUseCoupon(!useCoupon)}
              className="mr-2"
            />
            Use Coupon
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              checked={usePoints}
              onChange={() => setUsePoints(!usePoints)}
              className="mr-2"
            />
            Use Points
          </label>
        </div>
        <button 
        onClick={handleBuyTicket}
        className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-500 transition-colors mt-6 block w-full"
        >Buy Ticket</button>
      </div>
    </div>
  );
};

export default BuyTicketModal;