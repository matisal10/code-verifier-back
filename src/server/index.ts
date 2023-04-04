import express, { Express, Request, Response } from "express";
// security
import cors from 'cors'
import helmet from 'helmet'

// TODO: HTTPS

//root router
import router from '../routes'

// create express app
const server: Express = express();
// const port = process.env.PORT || 8000;

//define server to use '/api' and use rootRouter from 'index.ts' in routes
//from this point onover: http://localhost:8000/api/
server.use('/api', router)

//static server
server.use(express.static('public'))

//TODO: mongoose connection

// security config
server.use(helmet())
server.use(cors())

// content type config
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))

// redirections
//http://localhost:8000/ ---> http://localhost:8000/api/
server.get('/', (req: Request, res: Response) => {
    res.redirect('/api')
})
export default server

