import express, { Request, Response, response } from "express";
import { katasController } from "../controller/katasController";
import { LogInfo } from "../utils/logger";
// import { createUser } from '../domain/orm/user.orm';
import { orderByChances } from '../domain/orm/kastas.orm';

//middleware
import { verifyToken } from "../middlewares/verifyToken.middleware";
//body parser
import bodyParser from "body-parser";
import { IKata, KataLevel } from "../domain/interfaces/IKata.interfaces";
//middleware to read json
let jsonParser = bodyParser.json()

//Router from express
let kataRouter = express.Router()

// http://localhost:8000/api/katas?id=''
kataRouter.route('/')
    .get(verifyToken, async (req: Request, res: Response) => {
        //obtain a query param (id)
        let id: any = req?.query?.id
        let dif: any = req?.query?.dif
        let page: any = req?.query?.page || 1
        let limit: any = req?.query?.limit || 10
        LogInfo(`Query param: ${dif}`)
        //controller instance to excute method 
        const controller: katasController = new katasController()
        //obtain response
        const response = await controller.getKatas(page, limit, dif, id);
        //send to he client the response
        return res.send(response)
    })
    .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
        //obtain a query param (id)
        let id: any = req?.query?.id

        let { name, description, level, creator, valoration, intents, participants, solution } = req.body
        LogInfo(`Query param: ${id},${name}, ${valoration}`)

        if (name && description && level && creator && valoration >= 0 && intents >= 0 && participants.length >= 0 && solution) {
            //controller instance to excute method 
            const controller: katasController = new katasController()
            let kata: IKata = {
                name: name,
                description: description,
                level: level,
                creator: creator,
                // date: date,
                valoration: valoration,
                intents: intents,
                participants: participants,
                solution: solution
            }
            const response: any = await controller.updateKata(id, kata, valoration);
            //send to he client the response
            return res.status(200).send(response)
        }
        else {
            return res.status(400).send({
                message: '[ERROR] Updating kata you need to send all attrs'
            })
        }

    })
    .post(jsonParser, verifyToken, async (req: Request, res: Response) => {
        let { name, description, level, creator, valoration, intents, participants, solution } = req.body


        if (name && description && level && creator && valoration >= 0 && intents >= 0 && participants.length >= 0 && solution) {
            const controller: katasController = new katasController()
            let kata: IKata = {
                name: name,
                description: description,
                level: level,
                creator: creator,
                // date: date,
                valoration: valoration,
                intents: intents,
                participants: participants,
                solution: solution
            }
            const response: any = await controller.createKata(kata)
            return res.status(201).send(response)
        }
        else {
            return res.status(400).send({
                message: '[ERROR] Updating kata you need to send all attrs'
            })
        }

    })
    // delete
    .delete(verifyToken, async (req: Request, res: Response) => {
        //obtain a query param (id)
        let id: any = req?.query?.id
        LogInfo(`Query param: ${id}`)

        //controller instance to excute method 
        const controller: katasController = new katasController()

        //obtain response
        const response = await controller.deleteKata(id);

        //send to he client the response
        return res.status(response.status).send(response)
    })
kataRouter.route("/valoration")
    .get(verifyToken, async (req: Request, res: Response) => {
        //controller instance to excute method 
        const controller: katasController = new katasController()
        //obtain response
        const response = await controller.getPerValoration();
        //send to he client the response
        return res.send(response)
    })

kataRouter.route("/chances")
    .get(verifyToken, async (req: Request, res: Response) => {
        //controller instance to excute method 
        const controller: katasController = new katasController()
        //obtain response
        const response = await controller.getKatasOderByChances();
        //send to he client the response
        return res.send(response)
    })


export default kataRouter