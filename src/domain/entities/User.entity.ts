import mongoose from "mongoose";
import { IUser } from '../interfaces/IUser.interface';

export const userEntity = () => {
    let userSchema = new mongoose.Schema<IUser>(
        {
            name: { type: String, require: true },
            email: { type: String, require: true },
            edad: { type: Number, require: true },
            password: { type: String, require: true },
            katas: { type: [], require: true }
        }
    )


    const users = mongoose.models.users|| mongoose.model<IUser>('users', userSchema, 'users')
    return users
}