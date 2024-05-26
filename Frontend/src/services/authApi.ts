import axios from "./axios"
import {User,login} from '../context/UserContext'
export const registerRequest = async (user:User) => axios.post(`/register`, user)

export const loginRequest = async (user:login) => axios.post(`/login`, user)

export const findUser = async (userId:string) => axios.get(`/user/${userId}`)



/* export const verifyTokenRequest = async () => axios.get(`/auth/verify`) */