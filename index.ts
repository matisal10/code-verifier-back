import server from './src/server';
import { LogError, LogSucces } from './src/utils/logger';
import dotenv from 'dotenv'


// configuration the .env file
dotenv.config();

const port = process.env.PORT || 8000

//excute server
server.listen(port,()=>{
    LogSucces(`[SERVER ON]: Running in http://localhost:${port}/api/`)
})

//control server error
server.on("error",(error)=>{
    LogError(`[SERVER ERROR]: ${error}`)
})