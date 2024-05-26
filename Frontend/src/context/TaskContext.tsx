import { createContext, useContext, useState } from "react";
import axios from "../services/axios";

export interface Task {
  _id: string;
  name: string;
  description: string;
}

interface TaskContextType {
  tasks: Task[];
  fetchApiTask: () => Promise<void>;
  loading: boolean;
}

const taskContext = createContext<TaskContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const UseTask = (): TaskContextType => {
  const context = useContext(taskContext);
  if (!context) {
    throw new Error("No existe el contexto de las tareas");
  }
  return context;
};

export const AuthProviderTask: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchApiTask = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/task');
      setTasks(response.data);
      console.log(tasks)
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <taskContext.Provider value={{ tasks, fetchApiTask, loading }}>
      {children}
    </taskContext.Provider>
  );
};
