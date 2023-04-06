import mongoose from "mongoose";

export const kataEntity = () => {
    let kataSchema = new mongoose.Schema(
        {
            name: String,
            description: String,
            level: Number,
            user: Number,
            date: Date,
            valoration: Number,
            chances: Number,
            num_valoraciones: Number
        }
    )
    const katas = mongoose.models.katas || mongoose.model('katas', kataSchema, 'katas')
    return katas
}