"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import EventDetailsModal from "./EventDetailsModal";

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  price: string;
  capacity: number;
}

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [visibleEvents, setVisibleEvents] = useState<number>(6);

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleLoadMore = () => {
    setVisibleEvents((prev) => prev + 3);
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-20">
      <div className="pt-24 px-4 sm:px-6 lg:px-20">
        <h2 className="text-orange-600 text-3xl font-bold mb-6 text-center">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <p>No events available</p>
          ) : (
            events.slice(0, visibleEvents).map((event) => (
              <div
                key={event.id}
                className="bg-white border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src="https://via.placeholder.com/300"
                  alt={event.title || "Event image"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <span className="bg-orange-900 text-white text-sm font-semibold px-2 py-1 rounded">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <h3 className="ml-4 text-lg font-semibold text-gray-900">
                      {event.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-2">{event.description}</p>
                  <p className="text-gray-600">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="text-gray-600">
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    <strong>Price:</strong> IDR {event.price}
                  </p>
                  <p className="text-gray-600">
                    <strong>Capacity:</strong> {event.capacity}
                  </p>
                  <div className="flex space-x-2 mt-4">
                    <button
                      className="bg-orange-900 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors duration-300"
                      onClick={() => handleViewDetails(event)}
                    >
                      View Details
                    </button>
                    <button
                      className="bg-orange-900 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors duration-300"
                      onClick={() => router.push(`tickets/${event.id}`)}
                    >
                      Get Ticket
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {visibleEvents < events.length && (
          <div className="flex justify-center mt-6">
            <button
              className="bg-orange-900 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors duration-300"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {selectedEvent && (
        <EventDetailsModal event={selectedEvent} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default EventList;
