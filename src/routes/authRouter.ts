import express, { Request, Response, response } from "express";
import { AuthController } from "../controller/authController";
import { LogInfo } from "../utils/logger";
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuht } from "../domain/interfaces/IAuth.interfaces";

//bcrypt for password
import bcrypt from "bcrypt"


let authRouter = express.Router()

authRouter.route('/auth/register')
    .post(async (req: Request, res: Response) => {

        let { name, email, edad, password } = req.body
        let hashedPassword = ""

        if (name && email && edad && password) {

            //obtain the password in request
            hashedPassword = bcrypt.hashSync(req.body.password, 8)

            let newUser: IUser = {
                name,
                email,
                edad,
                password: hashedPassword
            }

            const controller: AuthController = new AuthController()

            // obtain response 
            const response: any = await controller.registerUser(newUser)

            return res.status(200).send(response)
        }

    })


authRouter.route('/auth/login')
    .post(async (req: Request, res: Response) => {

        let { email, password } = req.body

        if (email && password) {

            const controller: AuthController = new AuthController()

            let auth: IAuht = {
                email,
                password
            }

            // obtain response 
            const response: any = await controller.loginUser(auth)

            return res.status(200).send(response)
        }

    })

export default authRouter