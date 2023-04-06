import express, { Request, Response, response } from "express";
import { UserController } from "../controller/usersController";
import { LogInfo } from "../utils/logger";
import { createUser } from '../domain/orm/user.orm';

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
        return res.send(response)
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
        return res.send(response)
    })
    //post
    .post(async (req: Request, res: Response) => {

        let name: any = req?.query?.name;
        let age: any = req?.query?.age;
        let email: any = req?.query?.email;

        //controller instance to excute method 
        const controller: UserController = new UserController()
        //obtain response
        let user = {
            name: name || "default name",
            email: email || "default email",
            edad: age || 18
        }
        const response = await controller.createUser(user);
        //send to he client the response
        return res.send(response)
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
        const response = await controller.updateUser(id, user);
        //send to he client the response
        return res.send(response)
    })

//Export

export default userRouter