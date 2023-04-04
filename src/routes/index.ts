/**
 * root router
 * redirections to routers
 */

import express, { Request, Response } from 'express';
import helloRouter from './helloRouter';
import { LogInfo } from '@/utils/logger';

//server instance
let server = express()

//rooter instance
let rootRouter = express.Router()

//activate for request to http://localhost:8000/api/
rootRouter.get('/', (req: Request, res: Response) => {
    LogInfo('GET: http://localhost:8000/api/')
    res.status(200).json({ "data": { "message": " Goodbye, world" } })
})

//redireccitions to routers & controllers
server.use('/', rootRouter)
server.use('/hello', helloRouter)

export default server
