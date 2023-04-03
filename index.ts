import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv'

// configuration the .env file

dotenv.config();

// create express app

const app: Express = express();
const port = process.env.PORT || 8000;

//define the first route app
app.get('/',(req: Request, res: Response) => {
    res.status(200).json({"data":{"message":" Goodbye, world"}})
})

app.get('/hello/:name',(req: Request, res: Response) => {
    res.status(200).json({"data":{"message":`Hola, ${req.params.name? req.params.name : 'anonimo' }`}})
})

//excute app and listen request to port

app.listen(port, () =>{
    console.log(`express server: runnig at http://localhost:${port}`)
})