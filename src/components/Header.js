import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Header({ username}) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className="flex justify-between items-center p-4 shadow-md">
      <span className="text-sm text-gray-700">{formattedDate}</span>
      <div className="flex items-center ">
      <FontAwesomeIcon icon={faUser} className="mr-3 w-6 h-6 rounded-full bg-pink-500 text-white " />

        <span className="text-sm text-gray-700 ml-2">{username}</span>
      </div>
    </header>
  );
}

export default Header;
