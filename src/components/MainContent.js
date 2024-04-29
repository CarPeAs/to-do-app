import React from 'react';

function MainContent() {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div className="container mx-auto px-6 py-8">
        <div className="tasks-header">
          <h2>Tareas</h2>
          <div className="tasks-actions">
            <button className="new-task-btn">+ Nueva tarea</button>
          </div>
        </div>
        <div className="tasks-list">
        {/* <!-- Iteraremos sobre las tareas y crear una tarjeta de tarea para cada una --> */}
                    <div class="task-card">
                      <h3 class="task-title">Revisar desarrollo de la web</h3>
                      <p class="task-description">Revisar los avances diarios de la web</p>
                      <div class="task-status">
                        <span class="status-dot"></span>
                        <span class="status-text">Pendiente</span>
                      </div>
                      <button class="view-task-btn">Ver tarea</button>
                    </div>
        {/* <!-- Repetiremos el .task-card para más tareas --> */}
        </div>
      </div>
    </main>
  );
}

export default MainContent;