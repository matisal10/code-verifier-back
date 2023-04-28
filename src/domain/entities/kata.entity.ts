import mongoose from "mongoose";
import { IKata, KataLevel } from "../interfaces/IKata.interfaces";

export const kataEntity = () => {
    let kataSchema = new mongoose.Schema<IKata>(
        {
            name: { type: String, required: true },
            description: { type: String, required: true },
            level: { type: String, required: true },
            intents: { type: Number, required: true },
            valoration: { type: Number, required: true },
            creator: { type: String, required: true },
            solution: { type: String, required: true },
            participants: { type: [], required: true },
            date: { type: Date, required: true },
            num_valorations: { type: Number, required: true },
            files: { type: Object , require: true }
        }
    )
    const katas = mongoose.models.katas || mongoose.model<IKata>('katas', kataSchema, 'katas')
    return katas
}