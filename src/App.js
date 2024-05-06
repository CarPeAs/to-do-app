import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Sidebar, Home, MainContent, Equipos, Documentos, Proyectos, Calendario, Configuracion } from './components';

function App() {
  return (
    <Router>
    <div className="bg-gray-100 h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <Routes>
            <Route path="/tareas" element={<MainContent />} />
            <Route path="/home" element={<Home />} />
            <Route path="/equipos" element={<Equipos />} />
            <Route path="/documentos" element={<Documentos />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/configuracion" element={<Configuracion />} />
          </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;