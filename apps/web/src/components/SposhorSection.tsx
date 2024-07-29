import React from 'react';
import Image from 'next/image';

const sponsors = [
  { name: 'Spotify', src: '/images/sponsor1.png' },
  { name: 'Google', src: '/images/sponsor2.png' },
  { name: 'Stripe', src: '/images/sponsor3.png' },
  { name: 'YouTube', src: '/images/sponsor4.png' },
  { name: 'Microsoft', src: '/images/sponsor5.png' },
  { name: 'Medium', src: '/images/sponsor6.png' },
  { name: 'Zoom', src: '/images/sponsor7.png' },
  { name: 'Uber', src: '/images/sponsor8.png' },
  { name: 'Grab', src: '/images/sponsor9.png' },
];

const SponsorSection: React.FC = () => {
  return (
    <div className="bg-purple-50 py-12 px-4 sm:px-6 lg:px-8"> 
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-orange-900 mb-4">Join these brands</h2>
        <p className="text-orange-600 mb-8">
          Weve had the pleasure of working with industry-defining brands. These are just some of them.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="flex justify-center items-center p-2"> 
              <Image
                src={sponsor.src}
                alt={sponsor.name}
                width={150}
                height={75}
                objectFit="contain"
                className="grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorSection;
