
import mongoose, {Document, Schema} from 'mongoose'
import Usuarios from '../interface/UserInterface';

interface IUser extends Usuarios, Document{}

const UserSchema : Schema = new  mongoose.Schema(
    {
        name: {type:String, require: true},
        surname: {type:String},
        email : {type:String, require: true},
        password: {type: String, require:true}
    }
)

export default  mongoose.model<IUser>("User", UserSchema)