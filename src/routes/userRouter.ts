import express, { Request, Response, response } from "express";
import { UserController } from "../controller/usersController";
import { LogInfo } from "../utils/logger";

//Router from express
let userRouter = express.Router()

// http://localhost:8000/api/users
userRouter.route('/')
    .get(async (req: Request, res: Response) => {
        //controller instance to excute method 
        const controller: UserController = new UserController()
        //obtain response
        const response = await controller.getUsers();
        //send to he client the response
        return res.send(response)
    })

//Export

export default userRouter