import { Get, Route, Tags } from "tsoa";
import { IuserController } from "./interfaces";
import { LogSucces, LogError } from "../utils/logger";

//ORM - users collection
import { getAllUsers } from '../domain/orm/user.orm';

@Route('/api/users')
@Tags("userController")
export class UserController implements IuserController{
    /**
     * Enpoint to retreive the users in the collection "Users" of DB
     * 
     */
    @Get("/")
    public async getUsers(): Promise<any> {
        LogSucces('[/api/users] Get Request')
        const response = await getAllUsers()
        console.log(response)
        return response
    }
}
