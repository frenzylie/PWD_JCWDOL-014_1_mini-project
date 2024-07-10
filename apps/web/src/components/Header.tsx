"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  const [searchTerm,setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [events, setEvents] = useState([]); // Assume events data from API
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(10);
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('all');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    let filtered = events;

    if (debouncedSearchTerm) {
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter(event => event.category === category);
    }

    if (location !== 'all') {
      filtered = filtered.filter(event => event.location === location);
    }

    setFilteredEvents(filtered);
  }, [debouncedSearchTerm, category, location, events]);

  // Pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <header>
      <div>
        <div>
          <Link href = "/">
            Event Kita
          </Link>
        </div>
        <nav>
          <Link href= "/findEvents">
            Find Events
          </Link>
          <Link href = "/createEvents">
            Create Event
          </Link>
          <Link href="/logIn">
            Log In
          </Link>
          <Link href="/signUp">
            Sign Up
          </Link>
        </nav>
      </div>
      <div className="container mx-auto flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 rounded">
          <option value="all">All Categories</option>
          <option value="music">Music</option>
          <option value="sports">Sports</option>
          <option value="education">Education</option>
          {/* Add more categories as needed */}
        </select>
        <select value={location} onChange={(e) => setLocation(e.target.value)} className="p-2 rounded">
          <option value="all">All Locations</option>
          <option value="new-york">New York</option>
          <option value="los-angeles">Los Angeles</option>
          <option value="chicago">Chicago</option>
          {/* Add more locations as needed */}
        </select>
      </div>
      {/* Display current events */}
      <div className="container mx-auto mt-4">
        {currentEvents.length > 0 ? (
          currentEvents.map(event => (
            <div key={event.id} className="p-4 border-b">
              <h2 className="text-xl">{event.name}</h2>
              <p>{event.description}</p>
              <p>{event.location} - {event.date}</p>
              <p>{event.price}</p>
              <Link href={`/events/${event.id}`} className="text-blue-500">View Details</Link>
            </div>
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>
      {/* Pagination */}
      <div className="container mx-auto flex justify-center mt-4">
        {[...Array(Math.ceil(filteredEvents.length / eventsPerPage)).keys()].map(number => (
          <button key={number + 1} onClick={() => paginate(number + 1)} className="p-2 mx-1 bg-gray-700 text-white rounded">
            {number + 1}
          </button>
        ))}
      </div>
    </header>
  );
};
