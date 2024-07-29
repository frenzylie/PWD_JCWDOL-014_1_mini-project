"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 bg-amber-600 text-white md:px-16">
        <div className="text-lg font-bold">
          <Link href="/">
            Event Kita
          </Link>
        </div>
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4 6h16M4 12h16m-7 6h7" 
            />
          </svg>
        </button>
        <nav className="hidden md:flex md:gap-4">
          <ScrollLink to="events" smooth={true} duration={500}>
            Find Events
          </ScrollLink>
          <ScrollLink to="eventss" smooth={true} duration={500}>
            Create Event
            </ScrollLink>
          <Link href="/logIn">
            Log In
          </Link>
          <Link href="/signUp">
            Sign Up
          </Link>
        </nav>
      </header>
      {isOpen && (
        <nav className="flex flex-col items-start px-6 py-4 bg-amber-600 text-white md:hidden">
          <ScrollLink to="events" smooth={true} duration={500} className="py-2">
            Find Events
          </ScrollLink>
          <ScrollLink to="eventss" smooth={true} duration={500} className="py-2">
            Create Event
            </ScrollLink>
          <Link href="../app/logIn/page.tsx" className="py-2">
            Log In
          </Link>
          <Link href="../app/signUp/page.tsx" className="py-2">
            Sign Up
          </Link>
        </nav>
      )}
    </>
  );
};
