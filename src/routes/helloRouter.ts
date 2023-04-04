import express, { Request, Response, response } from "express";
import { HelloController } from "../controller/helloController";
import { LogInfo } from "../utils/logger";

//Router from express
let helloRouter = express.Router()

// http://localhost:8000/api/hello?name=''/
helloRouter.route('/')
    .get(async (req: Request, res: Response) => {
        //obtain a query param
        let name: any = req?.query?.name
        LogInfo(`Query param: ${name}`)
        //controller instance to excute method 
        const controller: HelloController = new HelloController()
        //obtain response
        const response = await controller.getMessage(name);
        //send to he client the response
        return res.send(response)
    })

//Export

export default helloRouter