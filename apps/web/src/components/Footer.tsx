"use client";

import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaYoutube } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';

export default function Footer() {
  return (
    <footer className="bg-amber-600 py-6">
      <div className="container mx-auto text-center">
        <nav className="flex justify-center space-x-4 mb-4">
          <ScrollLink 
            to="events" 
            smooth={true} 
            duration={500} 
            className="text-gray-300 hover:text-white cursor-pointer"
          >
            Find Event
          </ScrollLink>
          <ScrollLink 
            to="eventss" 
            smooth={true} 
            duration={500} 
            className="text-gray-300 hover:text-white cursor-pointer"
          >
            Create Event
          </ScrollLink>
          <a href="/logIn" className="text-gray-300 hover:text-white">LogIn</a>
          <a href="/signUp" className="text-gray-300 hover:text-white">SignUp</a>
        </nav>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.instagram.com/heni_fitriany?igsh=MWU4bGduOTlhaHJqZw==" className="text-gray-300 hover:text-pink-500">
            <FaInstagram size={24} />
          </a>
          <a href="https://github.com/iniHeni" className="text-gray-300 hover:text-white">
            <FaGithub size={24} />
          </a>
          <a href="https://www.youtube.com/@henifitriany1094" className="text-gray-300 hover:text-red-500">
            <FaYoutube size={24} />
          </a>
        </div>
        <p className="text-black">&copy; 2024 Event Kita</p>
      </div>
    </footer>
  );
}
