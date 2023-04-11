import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { LogSucces, LogError, LogWarning } from "../utils/logger";
import { IAuthController } from "./interfaces";
import { IUser } from "../domain/interfaces/IUser.interface";
import { error } from "console";
import { IAuht } from "../domain/interfaces/IAuth.interfaces";

import { registerUser, loginUser, logoutUser, getUserByID } from '../domain/orm/user.orm';
import { AuthResponse, ErrorResponse } from "./types";

@Route("api/auth")
@Tags("AuthController")
export class AuthController implements AuthController {
    // todo: implements functions
    @Post("/register")
    public async registerUser(user: IUser): Promise<any> {
        let response: AuthResponse | undefined | ErrorResponse
        if (user) {
            LogSucces(`[/api/auth/register] new user: ${user.email}`)
            await registerUser(user).then((r) => {
                response = {
                    message: `user created successfully: ${user.name}`,
                    token: r.token
                }
            })
        }
        else {
            LogWarning(`[/api/auth/register] register needs users`)
            response = {
                message: 'User no registered: please provide a user entity to create one',
                token: "Not valid",
            }
        }
        return response
    }
    @Post("/login")
    public async loginUser(auth: IAuht): Promise<any> {
        let response: AuthResponse | undefined | ErrorResponse
        if (auth) {

            LogSucces(`[/api/auth/login] login: ${auth.email}`)
            let data = await loginUser(auth)
            response = {
                token: data.token,
                message: `Welcome, ${data.user.name}`
            }

        }
        else {
            LogWarning(`[/api/auth/login] login needs email & password`)
            response = {
                error: '[AUTH ERROR]: email & passwprd are needed',
                message: 'please provide a email & password to login',
            }
        }
        return response
    }

    /**
     * Endpoint to retreive the users in the collection 'Users' of DB
     * middlewate: validate JWT
     * in headers you must add the x-access-token with a valid jwt
     * @param {string} id ID of user to retreive (optional)
     * @returns user found by id
     * 
     */
    @Get("/me")
    public async userData(@Query() id: string): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucces(`[/auth/me] Get user data by id:${id}`)
            response = await getUserByID(id)
        }
        return response
    }

    @Post("/logout")
    public async logoutUser(auth: any): Promise<any> {
        let response: any = ""
        throw error
    }

}
