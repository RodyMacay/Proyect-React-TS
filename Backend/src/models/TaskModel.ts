
import mongoose, { Schema, Document } from 'mongoose'
import { CreateTaskResquestBody } from '../interface/TaskInterface'

export interface Itask extends CreateTaskResquestBody, Document{}

const taskSchema: Schema = new mongoose.Schema(
    {
        name:{type:String, required:true, unique:true},
        description: {type : String}
    }
)
export default  mongoose.model<Itask>("Task", taskSchema)