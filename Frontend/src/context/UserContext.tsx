import { createContext, useContext, useEffect, useState } from "react";
import { findUser, loginRequest, registerRequest } from "../services/authApi";
import Cookies from 'js-cookie'
import axios from "../services/axios";

export interface User {
    id: string
    name: string
    surname: string
    email:string
    password : string
}
export interface login {
    email : string
    password : string
}

interface AuthContextType {
    user: User | null;
    register: (user: User) => Promise<void>; // Ahora acepta un objeto User
    loading: boolean;
    isAuthenticated: boolean;
    errors: string[]; // Define el tipo correcto para los errores
    login: (user: { email: string; password: string }) => Promise<void>; // Ahora acepta un objeto con las propiedades email y password
    logout: () => void;
    obtenerUsuario: (userId: string) => Promise<User | null>
    
  }

  const authContext = createContext <AuthContextType | null> (null)

  export const UseAuth = (): AuthContextType =>{
    const context = useContext(authContext)
    if (!context){
        throw new Error ( "No existe el contexto de la autentificación")
    }
    return context
  }

  export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // estados del usuario
    const [user,setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
      if (errors.length > 0) {
        const timer = setTimeout(() => {
          setErrors([]);
        }, 5000);
        // se ejecuta cuando sale del componente y se borra el objeto timer
        return () => clearTimeout(timer);
      }
    }, [errors])
    
    useEffect(() => {
      const checkLogin = async () => {
          const cookies = Cookies.get();
          if (!cookies.token) {
              setIsAuthenticated(false);
              setLoading(false);
              return;
          }
          try {
              const res = await verifyTokenRequest();
              if (!res.data) return setIsAuthenticated(false);
              setIsAuthenticated(true);
              setUser(res.data);
              setLoading(false);
          } catch (error) {
              setIsAuthenticated(false);
              setLoading(false);
          }
      };
      checkLogin();
    }, [])
    const register = async (user:User) => {
      try {
         const res = await registerRequest(user);
         if (res.status === 200) {
           setUser(res.data);
           console.log(res.data)
           setIsAuthenticated(true);
         }
       } catch (error:unknown) {
         console.log("erro",error);
        
       }
     }
     const login = async (user:login) => {
      try {
        const res = await loginRequest(user);
        if (res.status === 200) {
          setUser(res.data.user);
          console.log(res.data.user)
          setIsAuthenticated(true);
        }
      } catch (error:unknown) {
        console.log("error",error);
       
      }
    }
    const logout = () => {
      Cookies.remove("token");
      setUser(null);
      setIsAuthenticated(false);
      console.log("exito")
    }


    const obtenerUsuario = async (userId: string): Promise<User | null> => {
      try {
        const res = await findUser(userId);
        // Verifica si se encontraron datos del usuario
        if (res.data) {
          return res.data; // Devuelve los datos del usuario
        } else {
          return null; // Devuelve null si no se encontraron datos del usuario
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return null; // Maneja el error y devuelve null
      }
    }
    

    return (
      <authContext.Provider value={{ user, register, loading, isAuthenticated, errors, login, logout, obtenerUsuario }}>
          {children}
      </authContext.Provider>
  )
  }


    const verifyTokenRequest = async () => {
      try {
          return await axios.get(`/verify`);
      } catch (error) {
          throw new Error('Error al verificar el token');
      }
    }