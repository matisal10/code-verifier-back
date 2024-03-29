import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IuserController } from "./interfaces";
import { LogSucces, LogError, LogWarning } from "../utils/logger";

//ORM - users collection
import { createUser, delteUserByID, getAllUsers, getKatas, getUserByID, updateUserByid } from '../domain/orm/user.orm';

@Route('/api/users')
@Tags("userController")
export class UserController implements IuserController {

    /**
     * Endpoint to retreive the users in the collection 'Users' of DB
     * @param {string} id ID of user to retreive (optional)
     * @returns all users o user found by id
     * 
     */
    @Get("/")
    public async getUsers(@Query() page: number, @Query() limit: number, @Query() id?: string): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucces(`[/api/users] Get user by id:${id}`)
            response = await getUserByID(id)
        }
        else {
            LogSucces('[/api/users] Get Request all users')
            response = await getAllUsers(page, limit)
        }
        return response
    }
    /**
     * Endpoint to delete the users in the collection 'Users' of DB
     * @param {string} id id of user to delete (optional)
     * @returns message info if deletion was correct
     */

    @Delete("/")
    public async deleteUser(@Query() id?: string): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucces(`[/api/users] Delete user by id:${id}`)
            await delteUserByID(id).then((r) => {
                response = {
                    status: 204,
                    message: `User with id ${id} deleted successfully`
                }
            })
        }
        else {
            LogWarning('[/api/users] Delete user request without id')
            response = {
                status: 400,
                message: 'please, provide an ID to remove from database'
            }
        }
        return response
    }
    /**
     * Endpoint to create the users in the collection 'Users' of DB
     * @param user 
     * @returns message info if CREATED was correct
     */
    @Post("/")
    public async createUser(@Query() user: any): Promise<any> {
        let response: any = ''
        if (user) {
            LogSucces(`[/api/users] Create user :${user}`)
            await createUser(user).then((r) => {
                response = {
                    status: 204,
                    message: `User created: ${user.name}`
                }
            })
        }
        else {
            LogWarning('[/api/users] Create user')
            response = {
                status: 400,
                message: 'please, provide an User to create from database'
            }
        }

        return response
    }
    /**
     * Endpoint to update the users in the collection 'Users' of DB
     * @param id ID of user to UPDATE
     * @param user 
     * @returns message info if updated was correct
     */

    @Put("/{id}")
    public async updateUser(@Query() id: string, @Query() user: any): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucces(`[/api/users] Update user by id:${id}`)
            await updateUserByid(id, user).then((r) => {
                response = {
                    status: 200,
                    message: `User with id ${id} updated successfully`
                }
            })
        }
        else {
            LogWarning('[/api/users] Update user request without id')
            response = {
                status: 400,
                message: 'please, provide an ID to update from database'
            }
        }
        return response
    }
    @Get('/katas')
    public async getKatas(@Query() page: number, @Query() limit: number, @Query() id?: string): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucces(`[/api/user/kata] Get katas from user by id:${id}`)
            response = await getKatas(page,limit,id)
        }
        else {
            LogWarning('[/api/user/kata] Get kata from user request without id')
            response = {
                status: 400,
                message: 'please, provide an ID to get katas from database'
            }
        }
        return response
    }
}
