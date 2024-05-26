import Task from '../models/TaskModel'
import { Request, Response } from 'express';
import toNewTaskEntry from '../utils/utilsTask';


export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks)
        console.log("estas son las tareas", tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const createTask = async (req: Request, res: Response) => {

    try {
        console.log("Datos recibidos:", req.body);
        const { name, description } = toNewTaskEntry(req.body)
        console.log("Nombre:", name);
        console.log("Descripción:", description);

        const newTask = new Task({
            name,
            description
        })
        console.log(newTask)
        newTask.save()
        res.status(201).json(newTask)
        console.log("tarea agregada exitosamente", newTask)
    } catch (e: any) {
        console.error("Error al crear la tarea:", e);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const updateTask = await Task.findByIdAndUpdate(id, req.body, { new: true })
        if (!updateTask) throw new Error("Tarea no encontrada")
        res.status(200).json(updateTask)
        console.log("tarea actualizada", updateTask)
    } catch (e: any) {
        res.status(401).json({ message: e.message })
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const deleteTask = await Task.findByIdAndDelete(id)
        if (!deleteTask) throw new Error('tarea no encontrada')
        res.status(200).json(deleteTask)
        console.log("tarea eliminada con exito")
    } catch (e: any) {
        res.status(404).json({ message: e.message })
    }

}

export const filterTaskforId = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const filterTaskforId = await Task.findById(id)
        if (!filterTaskforId) throw new Error("no se encontra la tarea con ese id")
        res.status(200).json(filterTaskforId)
        console.log("task encontrada", filterTaskforId)
    } catch (e: any) {
        res.status(404).json({ message: e.message })

    }
}