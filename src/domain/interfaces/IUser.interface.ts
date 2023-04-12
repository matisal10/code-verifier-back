import { IKata } from "./IKata.interfaces"

export interface IUser {
    name: string
    email: string
    edad: number
    password: string
    katas: string[]
}