// src/App.js

import React,{ useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Header, Sidebar, Home, MainContent, Equipos, Documentos, Proyectos, Calendario, Configuracion, Login } from './components';

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // navigate('/login');
    window.location.reload(); // Recarga la página para redirigir al login
  };

  if (!user) {
    return <Login onLogin={() => window.location.reload()} />;
  }

  // const handleLogin = () => {
  //   setIsAuthenticated(true);
  // };

  // if (!isAuthenticated) {
  //   return <Login onLogin={handleLogin} />;
  // }

  return (
    <Router>
    <div className="bg-gray-100 h-screen flex">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header username={user.username}/>
        <Routes>
            <Route path="/tareas" element={<MainContent />} />
            <Route path="/home" element={<Home />} />
            <Route path="/equipos" element={<Equipos />} />
            <Route path="/documentos" element={<Documentos />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path="/login" element={<Login onLogin={() => window.location.reload()} />} />
          </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
