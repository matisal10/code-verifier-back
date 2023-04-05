import mongoose from "mongoose";

export const userEntity = () => {
    let userSchema = new mongoose.Schema(
        {
            name: { type: String, require: true },
            email: { type: String, require: true },
            edad: { type: Number, require: true }
        }
    )
    const web = mongoose.model('users', userSchema, 'users')
    return web
}