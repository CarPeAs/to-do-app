import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faListCheck, faUserPlus, faFile, faFolder, faCalendarDays, faGears } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <aside className="bg-pink-500 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <a href="#" className="text-white flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">TO-DO APP</span>
      </a>
      <nav className="px-4">
        <a href="#" className="py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-pink-700 flex items-center">
          <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
        </a>
        <a href="#" className="py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-pink-700 flex items-center">
          <FontAwesomeIcon icon={faListCheck} className="mr-2" /> Tareas
        </a>
        <a href="#" className="py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-pink-700 flex items-center">
          <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> Equipos
        </a>
        <a href="#" className="py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-pink-700 flex items-center">
          <FontAwesomeIcon icon={faFile} className="mr-2" /> Documentos
        </a>
        <a href="#" className="py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-pink-700 flex items-center">
          <FontAwesomeIcon icon={faFolder} className="mr-2" /> Proyectos
        </a>
        <a href="#" className="py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-pink-700 flex items-center">
          <FontAwesomeIcon icon={faCalendarDays} className="mr-2" /> Calendario
        </a>
      </nav>
      <div className="px-4 mt-4">
        <a href="#" className="py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-pink-700 flex items-center">
          <FontAwesomeIcon icon={faGears} className="mr-2" /> Configuración
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;