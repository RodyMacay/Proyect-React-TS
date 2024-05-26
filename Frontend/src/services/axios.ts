import axios from "axios";

// configurar axios con la url base del backend y para que acepte cokkie
const instance = axios.create({
    baseURL: `http://localhost:5000/users`,
    withCredentials: true,
});

export default instance;