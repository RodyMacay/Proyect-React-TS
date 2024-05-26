import {CreateTaskResquestBody} from '../interface/TaskInterface'


const isString = (String : string): boolean =>{
    return typeof String === 'string'
}

const parseName = (nameFromResquest : any): string =>{
    if (!isString (nameFromResquest)){
        throw new Error("name no es un string") 
    }
    return nameFromResquest
}

const parseDescription = (descriptionFromResquest : any): string =>{
    if (!isString (descriptionFromResquest)){
        throw new Error("description no es un string")
    }
    return descriptionFromResquest
}

const toNewTaskEntry = (object:any): CreateTaskResquestBody =>{
    const newEntry : CreateTaskResquestBody = {
        name : parseName(object.name),
        description: parseDescription(object.description)
    }
    
    return newEntry

}

export default toNewTaskEntry