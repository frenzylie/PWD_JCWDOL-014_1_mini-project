"use client";

import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const heroImages = [
    '/images/hero1.jpeg',
    // Tambahkan lebih banyak gambar jika diperlukan
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Ganti gambar setiap 5 detik

    return () => clearInterval(intervalId);
  }, [heroImages.length]);

  return (
    <section className="relative h-screen">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={image} alt={`Hero Image ${index + 1}`} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <h1 className="text-4xl md:text-6xl font-bold">SBS MTV The Kpop Show Ticket Package</h1>
              <p className="mt-4 text-lg md:text-2xl">
                Look no further! Our SBS The Show tickets are the simplest way for you to experience a live Kpop recording.
              </p>
              <div className="mt-8 space-x-4">
                <button className="px-6 py-3 bg-pink-500 text-white rounded-md text-lg">Get Ticket</button>
                <button className="px-6 py-3 bg-white text-black rounded-md text-lg">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Hero;
