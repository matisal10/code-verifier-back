import { IKata } from "@/domain/interfaces/IKata.interfaces";
import { IUser } from "../../domain/interfaces/IUser.interface";
import { BasicResponse, GoodbyeResponse } from "../types";


export interface IhelloController {
    getMessage(name?: string): Promise<BasicResponse>
}

export interface IuserController {
    // read all user from database || find user by id
    getUsers(page: number, limit: number, id?: string): Promise<any>
    // delete user by id
    deleteUser(id?: string): Promise<any>
    //update user
    updateUser(id: string, user: any): Promise<any>

    //get katas of user
    getKatas(page: number, limit: number, id: string): Promise<any>
}

export interface IAuthController {
    //register user
    registerUser(user: IUser): Promise<any>
    //login user
    loginUser(auth: any): Promise<any>
}

export interface IkastasController {
    //get
    getKatas(page: number, limit: number, dif?: number, id?: string): Promise<any>

    createKata(kata: IKata): Promise<any>

    updateKata(id: string, kata: IKata, valoration: number): Promise<any>

    deleteKata(id: string): Promise<any>

    //get all kastas of a user


}

export interface IgoodbyeController {
    getMessage(name?: string, date?: string): Promise<GoodbyeResponse>
}

