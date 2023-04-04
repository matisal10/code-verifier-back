import { BasicResponse, GoodbyeResponse } from "../types";


export interface IhelloController{
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IgoodbyeController{
    getMessage(name?:string, date?: string): Promise<GoodbyeResponse>
}

