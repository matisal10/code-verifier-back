import { BasicResponse, GoodbyeResponse } from "../types";


export interface IhelloController {
    getMessage(name?: string): Promise<BasicResponse>
}

export interface IuserController {

    // read all user from database
    getUsers(): Promise<any>
}

export interface IgoodbyeController {
    getMessage(name?: string, date?: string): Promise<GoodbyeResponse>
}

