import express, { Request, Response, response } from "express";
import { UserController } from "../controller/usersController";
import { LogInfo } from "../utils/logger";

//bcrypt for password
import bcrypt from "bcrypt"
import { IUser } from '../domain/interfaces/IUser.interface'

import bodyParser from "body-parser";

//middleware
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { IKata } from "../domain/interfaces/IKata.interfaces";
import { katasController } from "../controller/katasController";
import { getKatasPerDif } from '../domain/orm/kastas.orm';

let jsonParser = bodyParser.json();

//Router from express
let userRouter = express.Router()

// http://localhost:8000/api/users?id=''
userRouter.route('/')
    .get(verifyToken, async (req: Request, res: Response) => {
        //obtain a query param 
        let id: any = req?.query?.id
        let page: any = req?.query?.page || 1
        let limit: any = req?.query?.limit || 10
        LogInfo(`Query param: ${id}`)

        //controller instance to excute method 
        const controller: UserController = new UserController()

        //obtain response
        const response = await controller.getUsers(page, limit, id);

        //send to he client the response
        return res.status(200).send(response)
    })
    // delete
    .delete(verifyToken, async (req: Request, res: Response) => {
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
    .put(verifyToken, async (req: Request, res: Response) => {
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

userRouter.route("/katas")
    .get(verifyToken, async (req: Request, res: Response) => {
        //obtain a query param 
        let id: any = req?.query?.id
        let page: any = req?.query?.page || 1
        let limit: any = req?.query?.limit || 10
        LogInfo(`Query param: ${id}`)

        //controller instance to excute method 
        const controller: UserController = new UserController()

        //obtain response
        const response = await controller.getKatas(page, limit, id);

        //send to he client the response
        return res.status(200).send(response)
    })
    .delete(verifyToken, async (req: Request, res: Response) => {
        //obtain a query param (id)
        let id: any = req?.query?.id
        let creatorId: any = req?.query?.creatorId
        LogInfo(`Query param: ${id}`)

        //controller instance to excute method 
        const controller: katasController = new katasController()

        //obtain response
        const response = await controller.deleteKata(id, creatorId);

        //send to he client the response
        return res.status(response.status).send(response)
    })
    .post(jsonParser, verifyToken, async (req: Request, res: Response) => {
        let idUser: any = req?.query?.id
        let { name, description, level, creator, valoration, intents, participants, solution,files } = req.body
        let date = req.body.date
        let num_valorations = req.body.num_valorations

        LogInfo(`Query param: ${date},${name}, ${num_valorations}`)
        if (name && description && level && creator && valoration >= 0 && intents >= 0 && participants.length >= 0 && solution && date && num_valorations >= 0) {
            const controller: katasController = new katasController()
            let kata: IKata = {
                name: name,
                description: description,
                level: level,
                creator: creator,
                valoration: valoration,
                intents: intents,
                participants: participants,
                solution: solution,
                date: date,
                num_valorations: num_valorations,
                files: files
            }
            const response: any = await controller.createKata(kata, creator)
            return res.status(201).send(response)
        }
        else {
            return res.status(400).send({
                message: '[ERROR] Updating kata you need to send all attrs'
            })
        }

    })
    .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
        //obtain a query param (id)
        let id: any = req?.query?.id
        let idUser: any = req?.query?.creatorId
        let { name, description, level, creator, valoration, intents, participants, solution,files } = req.body
        let date = req?.body?.date
        let num_valorations = req?.body?.num_valorations
        LogInfo(`Query param: ${id},${name}, ${num_valorations}`)
        if (id) {
            if (name && description && level && creator && valoration >= 0 && intents >= 0 && participants.length >= 0 && solution) {
                //controller instance to excute method 
                const controller: katasController = new katasController()
                let kata: IKata = {
                    name: name,
                    description: description,
                    level: level,
                    creator: creator,
                    date: date,
                    valoration: valoration,
                    intents: intents,
                    participants: participants,
                    solution: solution,
                    num_valorations: num_valorations,
                    files:files
                }
                const response: any = await controller.updateKata(id, kata, valoration, idUser);
                //send to he client the response
                return res.status(200).send(response)
            }

        }
        else {
            return res.status(400).send({
                message: '[ERROR] Updating kata you need to send id'
            })
        }

    })
userRouter.route("/katas/dificultad")
    .get(verifyToken, async (req: Request, res: Response) => {
        //controller instance to excute method 
        const controller: katasController = new katasController()
        //obtain response
        const response = await controller.getKatasPerDif();
        //send to he client the response
        return res.send(response)
    })
userRouter.route("/katas/solution")
    .get(jsonParser, verifyToken, async (req: Request, res: Response) => {
        //controller instance to excute method 
        let id: any = req?.query?.id
        let solution = req?.query?.solution
        if (solution && id) {
            const controller: katasController = new katasController()
            //obtain response
            const response = await controller.getSolution(id);
            //send to he client the response
            return res.send(response)
        } else {
            return res.status(400).send({
                message: '[ERROR] need to send solution'
            })
        }

    })

userRouter.route("/katas/puntuacion")
    .get(verifyToken, async (req: Request, res: Response) => {
        //controller instance to excute method 
        const controller: katasController = new katasController()
        //obtain response
        const response = await controller.getPerValoration();
        //send to he client the response
        return res.send(response)
    })
    .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
        //obtain a query param (id)
        let id: any = req?.query?.id
        let valoration = req?.body?.valoration

        // LogInfo(`Query param: ${id},${name}, ${num_valorations}`)

        if (valoration) {
            //controller instance to excute method 
            const controller: katasController = new katasController()
            let kata: any = []
            let creator = ''
            const response: any = await controller.updateKata(id, kata, valoration, creator);
            //send to he client the response
            return res.status(200).send(response)
        }
        else {
            return res.status(400).send({
                message: '[ERROR] Updating kata you need to send all attrs'
            })
        }

    })

//Export

export default userRouter