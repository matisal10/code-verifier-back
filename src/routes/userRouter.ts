import express, { Request, Response, response } from "express";
import { UserController } from "../controller/usersController";
import { LogInfo } from "../utils/logger";

//bcrypt for password
import bcrypt from "bcrypt"
import { IUser } from '../domain/interfaces/IUser.interface'

import bodyParser from "body-parser";

let jsonParser = bodyParser.json();

//Router from express
let userRouter = express.Router()

// http://localhost:8000/api/users?id=''
userRouter.route('/')
    .get(async (req: Request, res: Response) => {
        //obtain a query param (id)
        let id: any = req?.query?.id
        LogInfo(`Query param: ${id}`)

        //controller instance to excute method 
        const controller: UserController = new UserController()

        //obtain response
        const response = await controller.getUsers(id);

        //send to he client the response
        return res.status(200).send(response)
    })
    // delete
    .delete(async (req: Request, res: Response) => {
        //obtain a query param (id)
        let id: any = req?.query?.id
        LogInfo(`Query param: ${id}`)

        //controller instance to excute method 
        const controller: UserController = new UserController()

        //obtain response
        const response = await controller.deleteUser(id);

        //send to he client the response
        return res.status(response.status).send(response)
    })
    //post
    .post(jsonParser, async (req: Request, res: Response) => {
        let name: any = req?.query?.name;
        let edad: any = req?.query?.edad;
        let email: any = req?.query?.email;
        LogInfo(`Query param: ${name}, ${email}, ${edad} `)

        //controller instance to excute method 
        const controller: UserController = new UserController()

        //obtain response
        let user = {
            name: name || "default name",
            email: email || "default email",
            edad: edad || 18
        }
        const response: any = await controller.createUser(user);

        //send to he client the response
        return res.status(201).send(response)
    })
    .put(async (req: Request, res: Response) => {
        //obtain a query param (id)
        let id: any = req?.query?.id
        let name: any = req?.query?.name;
        let edad: any = req?.query?.edad;
        let email: any = req?.query?.email;
        LogInfo(`Query param: ${id}, ${name}, ${email}, ${edad} `)

        //controller instance to excute method 
        const controller: UserController = new UserController()
        let user = {
            name: name,
            email: email,
            edad: edad
        }
        const response: any = await controller.updateUser(id, user);

        //send to he client the response
        return res.status(response.status).send(response)
    })


//Export

export default userRouter