import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IuserController } from "./interfaces";
import { LogSucces, LogError, LogWarning } from "../utils/logger";

//ORM - users collection
import { createUser, delteUserByID, getAllUsers, getUserByID, updateUserByid } from '../domain/orm/user.orm';
import { query } from "express";

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
    public async getUsers(@Query() id?: string): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucces(`[/api/users] Get user by id:${id}`)
            response = await getUserByID(id)
        }
        else {
            LogSucces('[/api/users] Get Request')
            response = await getAllUsers()
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
                    message: `User with id ${id} deleted successfully`
                }
            })
        }
        else {
            LogWarning('[/api/users] Delete user request without id')
            response = {
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
                    message: `User created: ${user.name}`
                }
            })
        }
        else{
            LogWarning('[/api/users] Create user')
            response = {
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
                    message: `User with id ${id} updated successfully`
                }
            })
        }
        else {
            LogWarning('[/api/users] Update user request without id')
            response = {
                message: 'please, provide an ID to upoate from database'
            }
        }
        return response
    }
}
