import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface TaskData {
  name: string;
  description: string;
}

const UpdateTaskPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>(); // Cambio de "id" a "taskId"
  const [task, setTask] = useState<TaskData>({
    name: '',
    description: '',
  });
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get<TaskData>(`http://localhost:5000/task/${taskId}`);
        setTask(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/task/update/${taskId}`, task);
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 px-4 py-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Actualizar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre:</label>
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descripción:</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
            Actualizar Tarea
    </button>
      </form>
    </div>
  )
};

export default UpdateTaskPage;
