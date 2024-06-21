// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-pink-500 text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <div className="mb-4">
          <h4 className="text-lg font-bold">TO-DO APP</h4>
        </div>
        <div className="flex space-x-4 mb-4">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
        <div>
          <p className="text-sm">&copy; 2024 TO-DO APP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
