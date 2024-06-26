import React, { useState } from 'react';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true  // Habilitar el envío de cookies
});


function Configuracion({ user, onUpdateUser }) {
  const [username, setUsername] = useState(user.username);
  const [message, setMessage] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    

    try {
      const response = await API.put(`/api/users/${user.id}`, { username });
      const updatedUser = { ...user, username }; // Actualizar el nombre de usuario
      onUpdateUser(updatedUser); // Actualizar el estado del usuario en App.js
      setMessage('Nombre de usuario actualizado correctamente');
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage(error.response?.data?.error || 'Error al actualizar el nombre de usuario');
    }
  };

  return (
    <div className="configuracion flex-1 overflow-y-auto bg-gray-200 p-6">
      <div className="container mx-auto">
        <h2 className="text-xl font-bold mb-4">Configuración</h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <div className="space-y-4">
          <div className="form-group">
            <label className="block text-gray-700">Nombre de usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full transition duration-200"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Configuracion;

