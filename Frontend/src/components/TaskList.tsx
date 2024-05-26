import axios from 'axios'
import  {  useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import LoadingDeleteComponent from '../ui/LoadingDelete'
import {  UseTask } from '../context/TaskContext'
import LoadingComponent from '../ui/Loading'

/* interface Task {
    _id: string
    name: string
    description:string
} */

const TaskList = () => {
    const { fetchApiTask, tasks } = UseTask()
/*     const [Task, setTask] = useState <Task[]> ([]) */
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);
    
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          // Llama a la función para obtener las tareas cuando el componente se monte
          await fetchApiTask();
          setLoading(false);
        } catch (error) {
          console.error("Error al cargar las tareas:", error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [fetchApiTask]);
      /* const fecthTask = useCallback(async () => {
      setLoading(true);
      try {
        const taskList = await fetchApiTask();
        setTask(taskList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, [fetchApiTask]);
  
    useEffect(() => {
      fecthTask();
    }, [fecthTask]); */

  const deleteTask = async (taskId: string) => {
    // Muestra la animación de eliminación
    setLoadingDelete(true);
    setTaskIdToDelete(taskId);

    // Espera 1 segundo antes de eliminar la tarea
    setTimeout(async () => {
      try {
        await axios.delete(`http://localhost:5000/task/delete/${taskId}`);
        setTask(Task.filter(task => task._id !== taskId));
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingDelete(false); // Oculta la animación de eliminación
        setTaskIdToDelete(null);
      }
    }, 1000);
  }
/* if (loading) {
  return <LoadingComponent/>
} */


return (
  <div className='min-w-screen min-h-screen bg-gray-900'>
    <Navbar />
    <div className="container mx-auto flex flex-col items-center pt-5">
      <div className="grid grid-cols-3 gap-4 px-80">
        {tasks.map(task => (
          <div className="mb-6 rounded-lg bg-gray-300 p-6" key={task.name}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{task.name}</h3>
                  <span className="block text-xs font-normal text-gray-500">{task.name}</span>
                </div>
              </div>
              <Link to={`/edit-task/${task._id}`} className="text-sm font-medium text-indigo-500">
                <span className="mr-0.5">+</span> Editar
              </Link>
            </div>
            <p className="my-6 text-sm font-normal text-gray-500">{task.description}</p>
            <div className="mt-6 flex items-center justify-between text-sm font-semibold text-gray-900">
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-2 h-5 w-5 text-base text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                </svg>
              </div>
              {loadingDelete && taskIdToDelete === task._id && <LoadingDeleteComponent />} {/* Muestra la animación de eliminación solo para la tarea que se está eliminando */}
              <div className="flex items-center">
                <button onClick={() => deleteTask(task._id)} type="button" className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800" data-dismiss-target="#alert-additional-content-2" aria-label="Close">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default TaskList
