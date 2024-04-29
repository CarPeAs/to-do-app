import React from 'react';

function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md">
      <span className="text-sm text-gray-700">26 de Abril de 2024</span>
      <div className="flex items-center">
        <img src="../img/cyber_koala.png" alt="User" className="h-8 w-8 rounded-full object-cover" />
        <span className="text-sm text-gray-700 ml-2">usuario@mail.com</span>
      </div>
    </header>
  );
}

export default Header;