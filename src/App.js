// src/App.js

import React,{ useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { Header, Footer, Sidebar, Home, MainContent, Equipos, Documentos, Proyectos, Calendario, Configuracion, Login, Register  } from './components';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = JSON.parse(atob(token.split('.')[1])); // Decodifica el token JWT para obtener la información del usuario
        setUser(user);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(atob(token.split('.')[1]));
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.reload(); // Recarga la página para redirigir al login
  };

  return (
    <Router>
      {user ? (
        <div className="bg-gray-100 min-h-screen flex flex-col">
          <div className="flex flex-1">
            <Sidebar onLogout={handleLogout} />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header username={user.username} />
              <Routes>
                <Route path="/tareas" element={<MainContent />} />
                <Route path="/home" element={<Home />} />
                <Route path="/equipos" element={<Equipos />} />
                <Route path="/documentos" element={<Documentos />} />
                <Route path="/proyectos" element={<Proyectos />} />
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/configuracion" element={<Configuracion />} />
                {/* <Route path="/login" element={<Login onLogin={() => window.location.reload()} />} /> */}
                <Route path="*" element={<Navigate to="/home" />} /> {/* Redirigir a HOME si la ruta no coincide */}
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} /> {/* Redirigir al login si el usuario no está autenticado */}
        </Routes>
      )}
    </Router>
  );
}

export default App;
