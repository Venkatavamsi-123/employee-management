import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-indigo-700 text-indigo-100 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Employee Manager</h2>
          <p className="text-sm">
            Streamline your HR processes with our intuitive employee management system.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/add" className="hover:underline">Add Employee</Link></li>
            <li><Link to="/list" className="hover:underline">Employee List</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-white"><FaGithub size={20} /></a>
            <a href="#" className="hover:text-white"><FaLinkedin size={20} /></a>
            <a href="#" className="hover:text-white"><FaTwitter size={20} /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-indigo-200 border-t border-indigo-500 py-4">
        © {new Date().getFullYear()} Employee Manager. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
