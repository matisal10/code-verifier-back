import mongoose from "mongoose";

export const userEntity = () => {
    let userSchema = new mongoose.Schema(
        {
            name: String,
            email: String,
            edad: Number
        }
    )
    return mongoose.model('Users', userSchema)
}