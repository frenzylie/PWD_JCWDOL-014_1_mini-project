"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import eventImage from 'web/public/images/image1.png';
import CreateEventModal from './CreateEventModal';

const CreateEventSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full bg-amber-300 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-8 md:p-12">
        <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8 w-full md:w-1/2 lg:w-1/3">
          <Image
            src={eventImage}
            alt="Create Event"
            layout="responsive"
            width={300}
            height={200}
            className="rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-2/3 text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Buat Acara Anda Sendiri
          </h2>
          <button 
            onClick={openModal}
            className="bg-orange-900 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300"
          >
            Buat Acara
          </button>
        </div>
      </div>
      {isModalOpen && <CreateEventModal onClose={closeModal} />}
    </div>
  );
};

export default CreateEventSection;
