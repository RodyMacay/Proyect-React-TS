import UserSchema from '../models/UserModel'
import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config'

export const Register = async (req:Request, res:Response) =>{
    try {
        const {name, surname, email, password} = req.body
        console.log(password)
        const userExisting = await UserSchema.findOne({email})
        if (userExisting) {
            throw new Error ("User already exists" )
        }
        const encryptedPassword = await bcrypt.hash (password, 10)
        const newUser = new UserSchema({
            name,
            surname,
            email, 
            password:encryptedPassword
        })
        console.log(encryptedPassword)
        await newUser.save()
        console.log(newUser)
        const accessToken = jwt.sign({ userId: newUser._id }, TOKEN_SECRET);
        res.cookie("token", accessToken)
        res.status(200).json(newUser)


    } catch (e:any) {
        res.status(500).json({message: e.message})
    }
}

export const Login = async (req:Request, res:Response) =>{
    try {
        const {email, password} = req.body
        const user = await UserSchema.findOne({ email })        
        if (!user) {
            return res.status(401).json({ message: 'Email inválido' });
        }
        const descryptedPassword = await bcrypt.compare (password, user.password)
        if (!descryptedPassword) {
            return res.status(401).json({ message: 'Password inválido' });
          }
      
        const accessToken = jwt.sign({ userId: user._id }, TOKEN_SECRET);
        res.cookie("token", accessToken)
        res.status(200).json({ accessToken, user })
        console.log(user)

    } catch (e:any) {
        res.status(500).json({message: e.message})
        console.log(res.status(500).json({message: e.message}))
    }
}
export const Logout = async (req:Request, res:Response) => {
    res.cookie("token", "", {
      secure: true,
      expires: new Date(0),
    });
    return res.sendStatus(200);
  }

export const verifyToken = async (req:Request, res:Response) => {
    const { token } = req.cookies;
    if (!token) 
    return res.send("error del token");
  
    jwt.verify(token, TOKEN_SECRET, async (error:any, user:any) => {
      if (error) return res.status(401).json(["Token No valido"])
      const userFound = await UserSchema.findById(user.userId);
    console.log(userFound)
      if (!userFound) return res.status(401).json(["Usuario no autorizado"]);
  
      return res.json({
        id: userFound._id,
        email: userFound.email,
      });
    });
  }

  export const filterUserforId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await UserSchema.findById(id);
        if (!user) {
            throw new Error("No se encuentra al usuario con ese ID");
        }
        res.status(200).json(user);
        console.log("Usuario encontrado:", user);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
        console.error("Error al buscar usuario por ID:", error);
    }
}