import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});

function Calendario() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchTasks = async () => {
      
      try {
        const response = await await API.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const onDateChange = (newDate) => {
    const adjustedDate = new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
    setDate(newDate);
    navigate(`/tareas?date=${adjustedDate}`);
  };

  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayTasks = tasks.filter(task => {
        const taskDate = new Date(task.due_date);
        return (
          taskDate.getFullYear() === date.getFullYear() &&
          taskDate.getMonth() === date.getMonth() &&
          taskDate.getDate() === date.getDate()
        );
      });
      if (dayTasks.length > 0) {
        return (
          <p className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            {dayTasks.length}
          </p>
        );
      }
    }
  };


  return (
    <div className="calendario flex-1 overflow-y-auto bg-gray-200 p-6">
      <div className="container mx-auto">
        <h2 className="text-xl font-bold mb-4">Calendario</h2>
        <div className="flex justify-center items-center bg-white p-8 rounded-lg shadow-md">
          <Calendar
            onChange={onDateChange}
            value={date}
            tileContent={getTileContent}
            className="w-full max-w-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Calendario;