"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import BuyTicketModal from './BuyTicket';

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  price: string;
  capacity: number;
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  userId: number;
  eventId: number;
}

interface EventDetailsModalProps {
  event: Event;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isBuyTicketModalOpen, setIsBuyTicketModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
        const response = await axios.get(`${apiUrl}events/events/${event.id}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error('Failed to fetch reviews', error);
      }
    };
    fetchReviews();
  }, [event.id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      if (!token) {
        console.error('No token found');
        return;
      }
      await axios.post(
        `${apiUrl}events/events/${event.id}/reviews`,
        {
          rating,
          comment,
          userId: 1, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews([...reviews, { rating, comment, userId: 1, eventId: event.id, id: Date.now() }]);
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Failed to submit review', error);
    }
  };

  const handleGetTicketClick = () => {
    setIsBuyTicketModalOpen(true);
  };

  const handleBuyTicketModalClose = () => {
    setIsBuyTicketModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto max-h-[80vh] relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-semibold mb-4">{event.title}</h2>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <p className="text-gray-600"><strong>Location:</strong> {event.location}</p>
        <p className="text-gray-600"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p className="text-gray-600"><strong>Price:</strong> IDR {event.price}</p>
        <p className="text-gray-600"><strong>Capacity:</strong> {event.capacity}</p>

        <h3 className="text-2xl font-semibold mt-6 mb-4">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
              <p className="text-lg font-medium">Rating: {review.rating}</p>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        )}

        <form onSubmit={handleReviewSubmit} className="mt-6">
          <h3 className="text-2xl font-semibold mb-4">Leave a Review</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border border-gray-300 rounded-lg p-3 w-full"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-500 transition-colors"
          >
            Submit Review
          </button>
        </form>

        <button
          // onClick={() => router.push(`tickets/${event.id}`)}
          onClick={handleGetTicketClick}
          className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-500 transition-colors mt-6 block w-full"
        >
          Get Ticket
        </button>
      </div>
      {isBuyTicketModalOpen && (
        <BuyTicketModal eventId={event.id} onClose={handleBuyTicketModalClose} />
      )}
    </div>
  );
};

export default EventDetailsModal;
