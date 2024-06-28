// src/components/MainContent.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import IconButton from './IconButton';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const API = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});

function MainContent() {
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'pending', due_date: '' });
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const dateFilter = query.get('date') || new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchTasks = async () => {
      // const token = localStorage.getItem('token');
      try {
        const response = await API.get('/api/tasks');
        const fetchedTasks = response.data;
        // console.log('Fetched tasks:', fetchedTasks);
        if (Array.isArray(fetchedTasks)) {
          const filteredTasks = fetchedTasks.filter(task => task.due_date === dateFilter);
          setTasks(filteredTasks);
        } else {
          console.error('Fetched tasks is not an array:', fetchedTasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [dateFilter]);

  const addTask = async () => {
    
    try {
      const response = await API.post('/api/tasks', newTask, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // console.log("New task added:", response.data);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTask({ title: '', description: '', status: 'pending', due_date: '' });
    } catch (error) {
      console.error("Error adding task:", error);
      alert('Error adding task: ' + (error.response?.data?.error || error.message));
    }
  };

  const deleteTask = async (index) => {
    
    const task = tasks[index];
    try {
      await API.delete(`/api/tasks/${task.id}`);
      setTasks(tasks.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleChange = (index, field, value) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, [field]: value } : task
    );
    setTasks(updatedTasks);
  };

  const handleSave = async (index) => {
   
    const task = tasks[index];
    try {
      await API.put(`/api/tasks/${task.id}`, { 
        title: task.title, 
        description: task.description,  
        status: task.status, 
        due_date: task.due_date  
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setEditIndex(-1);
    } catch (error) {
      console.error("Error updating task:", error);
      alert('Error updating task: ' + (error.response?.data?.error || error.message));
    }
  };

  const toggleTaskStatus = async (index) => {
    const task = tasks[index];
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    try {
      await API.put(`/api/tasks/${task.id}`, { 
        ...task, 
        status: newStatus 
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setTasks(tasks.map((t, i) => i === index ? { ...t, status: newStatus } : t));
    } catch (error) {
      console.error("Error toggling task status:", error);
      alert('Error toggling task status: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <main className="tareas flex-1 overflow-y-auto bg-gray-200 p-6">
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tareas</h2>
        <div>
            <input
              type="text"
              placeholder="Título tarea"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Descripción tarea"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <input
              type="date"
              value={newTask.due_date}
              onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
            />
            <button
              className="bg-pink-500 hover:bg-gray-100 text-white hover:text-pink-700 font-bold py-2 px-4 rounded-full"
              onClick={addTask}
            >
              + Nueva tarea
            </button>
          </div>
      </div>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div key={index} 
          className={`bg-white p-4 rounded-lg shadow flex items-center justify-between ${task.status === 'completed' ? 'bg-green-100' : 'bg-red-100'}`}
          onClick={() => toggleTaskStatus(index)}
          >
            {editIndex === index ? (
              <>
                <input value={task.title} onChange={(e) => handleChange(index, 'title', e.target.value)} className="px-3 py-2 border rounded mr-2" />
                <input value={task.description} onChange={(e) => handleChange(index, 'description', e.target.value)} className="px-3 py-2 border rounded mr-2" />
                <input type="date" value={task.due_date} onChange={(e) => handleChange(index, 'due_date', e.target.value)} className="px-3 py-2 border rounded mr-2" />
                <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleSave(index)}
                  >
                    Guardar
                  </button>
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="text-gray-600">Fecha: {task.due_date}</p>
                </div>
                <div>
                  <button className="text-blue-500 hover:text-blue-700 mr-2">Ver tarea</button>
                  <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 ${task.status === 'completed' ? 'bg-green-300' : 'bg-red-300'}`}>
                    {task.status === 'completed' ? 'Completada' : 'Pendiente'}
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