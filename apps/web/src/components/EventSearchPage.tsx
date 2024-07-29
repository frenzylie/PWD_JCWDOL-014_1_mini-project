'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import EventList from "./EventList";

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  price: string;
  capacity: number;
  type?: string; 
}

const EventSearchPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("all");
  const [location, setLocation] = useState("all");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
        if (!apiUrl) {
          throw new Error("API URL is not defined");
        }

        console.log("Fetching events from:", `${apiUrl}events/events`);

        const response = await axios.get(`${apiUrl}events/events`);
        
        console.log("Response data:", response.data);
        setEvents(response.data);
        setFilteredEvents(response.data); 
      } catch (error: any) {
        console.error("Error:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (type !== "all") {
      filtered = filtered.filter(
        (event) => event.type?.toLowerCase() === type.toLowerCase()
      );
    }

    if (location !== "all") {
      filtered = filtered.filter(
        (event) => event.location?.toLowerCase() === location.toLowerCase()
      );
    }

    setFilteredEvents(filtered);
  }, [searchTerm, type, location, events]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="custom-loader"></div>
    </div>
  );
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        type={type}
        setType={setType}
        location={location}
        setLocation={setLocation}
      />
      <EventList events={filteredEvents} />
    </div>
  );
};

export default EventSearchPage;
