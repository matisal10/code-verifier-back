import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv'

// configuration the .env file

dotenv.config();

// create express app

const app: Express = express();
const port = process.env.PORT || 8000;

//define the first route app
app.get('/',(req: Request, res: Response) => {
    res.send('welcome to API Restful: expess + ts + swagger + mongoose')
})

app.get('/hello',(req: Request, res: Response) => {
    res.send('welcome to get route !hello!')
})

//excute app and listen request to port

app.listen(port, () =>{
    console.log(`express server: runnig at http://localhost:${port}`)
})