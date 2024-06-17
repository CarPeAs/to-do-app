import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Bienvenido a TO-DO APP</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-6xl mx-4 my-4">
        <Link to="/tareas" className="group">
          <div className="p-6 bg-pink-500 hover:bg-pink-700 text-white rounded-lg shadow-lg transform transition-transform group-hover:scale-105 flex flex-col justify-center items-center h-48">
            <h2 className="text-2xl font-semibold mb-2">Tareas</h2>
            <p className="text-gray-600">Administra y visualiza tus tareas.</p>
          </div>
        </Link>
        <Link to="/calendario" className="group">
          <div className="p-6 bg-blue-500 hover:bg-blue-700 text-white rounded-lg shadow-lg transform transition-transform group-hover:scale-105 flex flex-col justify-center items-center h-48">
            <h2 className="text-2xl font-semibold mb-2">Calendario</h2>
            <p className="text-gray-600">Visualiza tus eventos y tareas en un calendario.</p>
          </div>
        </Link>
        <Link to="/proyectos" className="group">
          <div className="p-6 bg-green-500 hover:bg-green-700 text-white rounded-lg shadow-lg transform transition-transform group-hover:scale-105 flex flex-col justify-center items-center h-48">
            <h2 className="text-2xl font-semibold mb-2">Proyectos</h2>
            <p className="text-gray-600">Gestiona tus proyectos y tareas relacionadas.</p>
          </div>
        </Link>
        <Link to="/documentos" className="group">
          <div className="p-6 bg-yellow-500 hover:bg-yellow-700 text-white rounded-lg shadow-lg transform transition-transform group-hover:scale-105 flex flex-col justify-center items-center h-48">
            <h2 className="text-2xl font-semibold mb-2">Documentos</h2>
            <p className="text-gray-600">Sube y administra tus documentos.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
