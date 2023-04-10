import { IUser } from "../../domain/interfaces/IUser.interface";
import { BasicResponse, GoodbyeResponse } from "../types";


export interface IhelloController {
    getMessage(name?: string): Promise<BasicResponse>
}

export interface IuserController {
    // read all user from database || find user by id
    getUsers(id?: string): Promise<any>
    // delete user by id
    deleteUser(id?: string): Promise<any>
    //update user
    updateUser(id: string, user: any): Promise<any>
}

export interface IAuthController {
    //register user
    registerUser(user: IUser): Promise<any>
    //login user
    loginUser(auth: any): Promise<any>
}

export interface IkastasController {
    //get
    getKatas(dif?: number): Promise<any>
    updateKatas(id: string, kata: any, valoration: number): Promise<any>
}

export interface IgoodbyeController {
    getMessage(name?: string, date?: string): Promise<GoodbyeResponse>
}

