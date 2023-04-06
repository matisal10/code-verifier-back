/**
 * root router
 * redirections to routers
 */

import express, { Request, Response } from 'express';
import { LogInfo } from '../utils/logger';
import HelloRouter from './helloRouter';
import GoodbyeRouter from './goodbyeRouter';
import userRouter from './userRouter';
import kataRouter from './kataRouter';

//server instance
let server = express()

//rooter instance
let rootRouter = express.Router()

//activate for request to http://localhost:8000/api/
rootRouter.get('/', (req: Request, res: Response) => {
    LogInfo('GET: http://localhost:8000/api/')
    res.send("welcome to api restful")
})

//redireccitions to routers & controllers
server.use('/', rootRouter)
server.use('/hello', HelloRouter)
server.use('/goodbye', GoodbyeRouter)
server.use('/users', userRouter)
server.use('/kata', kataRouter)

export default server
