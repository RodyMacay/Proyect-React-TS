import express, { Router } from 'express';
import bodyParser from 'body-parser';
import routerTask from './routers/taskRouters'
import routerUser from './routers/userRouters'
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://192.168.100.73:8081", "http://localhost:5173"],
    credentials: true
}));

app.use(cookieParser())
app.get("/", (req, res) => {
    res.send("Bienvenidos al arranque del servidor");
});

app.use('/task',routerTask )
app.use('/users',routerUser )
export default app;
