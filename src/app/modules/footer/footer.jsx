"use client"

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#133e87] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              Welcome to the official Attendance Portal for Class SE-6A,
              Department of DCS at
              National Textile University. This portal helps students
              and faculty track attendance efficiently with a user-friendly interface.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="font-bold">Address:</span> Shreianabad Colony,Sugar Moor, FSD
              </li>
              <li className="text-gray-400">
                <span className="font-bold">Phone:</span> +92 341 9385624
              </li>
              <li className="text-gray-400">
                <span className="font-bold">Email:</span> frasatali120@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} | GOAT Production | All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
