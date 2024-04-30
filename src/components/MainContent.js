import React, { useState } from 'react';
import IconButton from './IconButton';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function MainContent() {
  const [tasks, setTasks] = useState([
    {
      title: "Revisión del desarrollo de la App",
      description: "Lorem ipsum dolor sit amet",
      status: "Pendiente"
    },
    {
      title: "Video llamada con el equipo",
      description: "Lorem ipsum dolor sit amet",
      status: "Pendiente"
    },
    {
      title: "Pasear al gato",
      description: "Lorem ipsum dolor sit amet",
      status: "Completada"
    }
  ]);

  const [editIndex, setEditIndex] = useState(-1);

  const addTask = (title, description) => {
    const newTask = {
      title: title,
      description: description,
      status: 'Pendiente' // Status por defecto para nuevas tareas
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  {/*const editTask = (index, updatedTask) => {
    const updatedTasks = tasks.map((task, i) => i === index ? { ...task, ...updatedTask } : task);
    setTasks(updatedTasks);
  };*/}

  const handleSave = (index, title, description) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, title, description } : task
    );
    setTasks(updatedTasks);
    setEditIndex(-1);
  };

  return (
    <main className="flex-1 overflow-y-auto bg-gray-200 p-6">
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tareas</h2>
        <button className="bg-pink-500 hover:bg-gray-100 text-white hover:text-pink-700 font-bold py-2 px-4 rounded-full" onClick={() => addTask('Nueva tarea', 'Describe la tarea aquí')}>
          + Nueva tarea
        </button>
      </div>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div key={index} className={`bg-white p-4 rounded-lg shadow flex items-center justify-between ${task.status === 'Completada' ? 'bg-green-100' : 'bg-red-100'}`}>
            {editIndex === index ? (
              <>
                <input value={task.title} onChange={(e) => handleSave(index, e.target.value, task.description)} />
                <input value={task.description} onChange={(e) => handleSave(index, task.title, e.target.value)} />
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                </div>
                <div>
                  <button className="text-blue-500 hover:text-blue-700 mr-2">Ver tarea</button>
                  <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 ${task.status === 'Completada' ? 'bg-green-300' : 'bg-red-300'}`}>
                    {task.status}
                  </span>
                  <div className="task-actions">
                    <IconButton
                      icon={faEdit}
                      onClick={() => handleEdit(index)}
                      className="text-blue-500 hover:text-blue-700"
                    />
                   <IconButton
                      icon={faTrashAlt}
                      onClick={() => deleteTask(index)}
                      className="text-red-500 hover:text-red-700"
                  />
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  </main>
  );
}

export default MainContent;