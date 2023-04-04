import { BasicResponse } from "../types";


export interface IhelloController{
    getMessage(name?:string): Promise<BasicResponse>
}

