import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

/**
 * 
 * @param {Request} req Original rquest previous middleware of veification jwt
 * @param {Response} res response to veification jwt
 * @param {NextFunction} next next function to be executed
 * @returns errors ofverification or next execution
 */

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    //cheack Header from request for 'x-access-token'
    let token: any = req.headers['x-access-token']

    // Verify if jwt is present
    if (!token) {
        return res.status(403).send({
            authenticationError: 'Missing JWT in request',
            message: 'Not authorised to consumed this endpoint'
        })
    }

    //Verify then token obtained
    jwt.verify(token, "", (err: any, decoded: any) => {
        return res.status(500).send({
            authenticationError: 'JWT verification failed',
            message: 'Faild to verify JWT token in request'
        })
    })

    //pass something to next to request (id of user || other info)
    
    // execute next function -> protedted routes will be executed 
    next()
}