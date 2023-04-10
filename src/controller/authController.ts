import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { LogSucces, LogError, LogWarning } from "../utils/logger";
import { IAuthController } from "./interfaces";
import { IUser } from "../domain/interfaces/IUser.interface";
import { error } from "console";
import { IAuht } from "../domain/interfaces/IAuth.interfaces";

import { registerUser, loginUser, logoutUser } from '../domain/orm/user.orm';

@Route("api/auth")
@Tags("AuthController")
export class AuthController implements AuthController {
    // todo: implements functions
    @Post("/register")
    public async registerUser(user: IUser): Promise<any> {
        let response: any = ""
        if (user) {
            LogSucces(`[/api/auth/register] new user: ${user}`)
            await registerUser(user).then((r) => {
                response = {
                    message: `user created successfully: ${user.name}`
                }
            })
        }
        else {
            LogWarning(`[/api/auth/register] register needs users`)
            response = {
                message: 'please provide a user entity to create one'
            }
        }
        return response
    }
    @Post("/login")
    public async loginUser(auth: IAuht): Promise<any> {
        let response: any = ""
        if (auth) {
            // LogSucces(`[/api/auth/login] login: ${auth.email}`)
            await loginUser(auth).then((r) => {
                LogSucces(`[/api/auth/login] login: ${auth.email}`)
                response = {
                    message: `user loggged successfully: ${auth.email}`,
                    token: r.token
                }
            })
        }
        else {
            LogWarning(`[/api/auth/login] login needs email & password`)
            response = {
                message: 'please provide a email & password to login'
            }
        }
        return response
    }
    @Post("/logout")
    public async logoutUser(auth: any): Promise<any> {
        let response: any = ""
        throw error
    }

}
