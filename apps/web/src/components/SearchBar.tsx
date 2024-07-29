"use client";

import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  type: string;
  setType: (type: string) => void;
  location: string;
  setLocation: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  type,
  setType,
  location,
  setLocation,
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 -mt-24 p-6 bg-orange-900 text-white rounded-lg shadow-lg max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col w-full md:w-1/3">
            <label className="mb-2 text-sm md:text-base font-semibold">Search Event</label>
            <input
              type="text"
              placeholder="Search for events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 rounded border border-gray-300 text-black w-full"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/3">
            <label className="mb-2 text-sm md:text-base font-semibold">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-3 rounded border border-gray-300 text-black w-full"
            >
              <option value="all">All Locations</option>
              <option value="new-york">New York</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="chicago">Chicago</option>
              <option value="indonesia">Indonesia</option>
              {/* Add more locations as needed */}
            </select>
          </div>
          <div className="flex flex-col w-full md:w-1/3">
            <label className="mb-2 text-sm md:text-base font-semibold">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-3 rounded border border-gray-300 text-black w-full"
            >
              <option value="all">All Types</option>
              <option value="music">Music</option>
              <option value="sports">Sports</option>
              <option value="education">Education</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
