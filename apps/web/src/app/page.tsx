import React from 'react';
import Image from 'next/image';
import EventSearchPage from '@/components/EventSearchPage'; 
import CreateEventSection from '@/components/CreateEventSection';
import SponsorSection from '@/components/SposhorSection';

const Home: React.FC = () => {
  const heroImage = '/images/hero1.jpeg'; // Path to your hero image

  return (
    <>
      <section className="hero-section relative h-screen">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <h1 className="text-4xl md:text-6xl font-bold">Welcome to Event Kita</h1>
              <p className="mt-4 text-lg md:text-2xl">
                Find and create events with ease
              </p>
              <div className="mt-8 space-x-4">
                <button className="px-6 py-3 bg-pink-500 text-white rounded-md text-lg">Get Ticket</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="events">
        <EventSearchPage />
      </section>
      <section id="eventss">
      <CreateEventSection />
      </section>
      <SponsorSection/>
    </>
  );
};

export default Home;
