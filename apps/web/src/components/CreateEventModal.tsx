import React, { useState } from 'react';
import axios from 'axios';

interface CreateEventModalProps {
  onClose: () => void;
}

const eventTypes = [
  'Music', 'Nightlife', 'Arts', 'Holidays', 'Dating', 'Hobbies', 'Business', 'Foods'
];

const CreateEventModal: React.FC<CreateEventModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [capacity, setCapacity] = useState<number>(0);
  const [eventType, setEventType] = useState<string>('');
  const [organizerId, setOrganizerId] = useState<number>(1);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      await axios.post(
        `${apiUrl}events/events`,
        {
          title,
          description,
          location,
          date,
          price,
          capacity,
          type: eventType,
          organizerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccessMessage('Event successfully created!');
      setTitle('');
      setDescription('');
      setLocation('');
      setDate('');
      setPrice(0);
      setCapacity(0);
      setEventType('');
      setOrganizerId(1);

      setTimeout(() => {
        onClose();
        setSuccessMessage(null);
      }, 2000);

    } catch (error) {
      console.error('Failed to create event', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative mx-auto max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Buat Acara Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-700">Nama Acara</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Deskripsi</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full h-24 resize-none"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Lokasi</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Tanggal</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Harga (IDR)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Kapasitas</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Jenis Acara</label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            >
              <option value="" disabled>Pilih jenis acara</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-gray-700">ID Organizer</label>
            <input
              type="number"
              value={organizerId}
              onChange={(e) => setOrganizerId(Number(e.target.value))}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-orange-900 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300 w-full"
          >
            Buat Acara
          </button>
        </form>

        {successMessage && (
          <div className="flex flex-col gap-2 w-full sm:w-80 text-xs sm:text-sm z-50 mt-4">
            <div className="succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-4 py-2">
              <div className="flex gap-2 items-center">
                <div className="text-[#2b9875] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-white">{successMessage}</p>
                  <p className="text-gray-500">The event was created successfully.</p>
                </div>
              </div>
              <button
                onClick={() => setSuccessMessage(null)}
                className="text-gray-600 hover:bg-white/5 p-1 rounded-md transition-colors ease-linear"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEventModal;
