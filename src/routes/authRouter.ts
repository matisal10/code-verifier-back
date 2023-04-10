import express, { Request, Response, response } from "express";
import { AuthController } from "../controller/authController";
import { LogInfo } from "../utils/logger";
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuht } from "../domain/interfaces/IAuth.interfaces";

//bcrypt for password
import bcrypt from "bcrypt"

//middleware
import { verifyToken } from "../middlewares/verifyToken.middleware";
//body parser
import bodyParser from "body-parser";
//middleware to read json
let jsonParser = bodyParser.json()


let authRouter = express.Router()

authRouter.route('/register')
    .post(jsonParser, async (req: Request, res: Response) => {

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
        else{
            return res.status(400).send({
                message: '[Error user data missing]: No user can be registered'
            })
        }

    })


authRouter.route('/login')
    .post(jsonParser, async (req: Request, res: Response) => {

        let { email, password } = req?.body

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
        else{
            return res.status(400).send({
                message: '[Error user data missing]: No user can be registered'
            })
        }

    })

    // route protyected by verify token middleware
    authRouter.route('/me')
        .get(verifyToken, async(req: Request, res: Response)=>{
            //obatain id of user
            let id: any = req?.query?.id
            if(id){
                const controller : AuthController = new AuthController()
                //obtain response
                let response: any = await controller.userData(id)
                return res.status(200).send(response)
            }
            else{
                return res.status(401).send({
                    message: 'You are not auth to perform this action'
                })
            }
        })


export default authRouter