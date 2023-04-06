import express, { Request, Response, response } from "express";
import { katasController } from "../controller/katasController";
import { LogInfo } from "../utils/logger";
// import { createUser } from '../domain/orm/user.orm';
import { orderByChances } from '../domain/orm/kastas.orm';

//Router from express
let kataRouter = express.Router()

// http://localhost:8000/api/katas?id=''
kataRouter.route('/')
    .get(async (req: Request, res: Response) => {
        //obtain a query param (id)
        let dif: any = req?.query?.dif
        LogInfo(`Query param: ${dif}`)
        //controller instance to excute method 
        const controller: katasController = new katasController()
        //obtain response
        const response = await controller.getKatas(dif);
        //send to he client the response
        return res.send(response)
    })
    .put(async (req: Request, res: Response) => {
        //obtain a query param (id)
        let id: any = req?.query?.id
        let name: any = req?.query?.name;
        let description: any = req?.query?.description;
        let level: any = req?.query?.level;
        let user: any = req?.query?.user;
        let date: any = req?.query?.date;
        let chances: any = req?.query?.chances;
        let valoration: any = req?.query?.valoration;
        LogInfo(`Query param: ${id}, ${valoration}`)
        //controller instance to excute method 
        const controller: katasController = new katasController()
        let kata = {
            name: String,
            description: description,
            level: level,
            user: user,
            date: date,
            valoration: valoration,
            chances: chances
        }
        const response: any = await controller.updateKatas(id, kata,parseInt(valoration));
        //send to he client the response
        return res.send(response)
    })
kataRouter.route("/valoration")
    .get(async (req: Request, res: Response) => {
        //controller instance to excute method 
        const controller: katasController = new katasController()
        //obtain response
        const response = await controller.getPerValoration();
        //send to he client the response
        return res.send(response)
    })

kataRouter.route("/chances")
    .get(async (req: Request, res: Response) => {
        //controller instance to excute method 
        const controller: katasController = new katasController()
        //obtain response
        const response = await controller.getKatasOderByChances();
        //send to he client the response
        return res.send(response)
    })


export default kataRouter