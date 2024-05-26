import express from 'express'
import { createTask, deleteTask, filterTaskforId, getTasks, updateTask } from '../controllers/TaskController'

const router = express.Router()

router.get ('/', getTasks)
router.post('/addTask', createTask)
router.put("/update/:id", updateTask)
router.delete('/delete/:id', deleteTask)
router.get("/:id", filterTaskforId)
export default router