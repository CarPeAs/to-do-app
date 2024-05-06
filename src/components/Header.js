import React from 'react';
import koalaImage from '../../img/cyber_koala.png';

function Header() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className="flex justify-between items-center p-4 shadow-md">
      <span className="text-sm text-gray-700">{formattedDate}</span>
      <div className="flex items-center">
        <img src={koalaImage} alt="User" className="h-8 w-8 rounded-full object-cover" />
        <span className="text-sm text-gray-700 ml-2">usuario@mail.com</span>
      </div>
    </header>
  );
}

export default Header;

console.log(koalaImage);
