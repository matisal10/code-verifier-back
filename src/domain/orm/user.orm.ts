import { userEntity } from "../entities/User.entity";
import { LogError, LogSucces } from "../../utils/logger";
import { IUser } from '../interfaces/IUser.interface';
import { IAuht } from "../interfaces/IAuth.interfaces";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

//configuration of env
dotenv.config()

//obtain secret key
const secret = process.env.SECRETKEY || "THISTXTFORJWT"

// crud

/**
 * method to obtain all users from collection "users" in mongo server
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity()
        //search
        return await userModel.find({})
    } catch (error) {
        LogError(`[ORM ERROR]: Getting all users ${error}`)
    }
}

// todo: 
// -get user by id
export const getUserByID = async (id: string): Promise<any | undefined> => {
    try {
        let userModel = userEntity()
        //search by id
        return await userModel.findById(id)
    } catch (error) {
        LogError(`[ORM ERROR]: Getting users by id ${error}`)
    }
}
// -get user by email
// -delete user by id
export const delteUserByID = async (id: string): Promise<any | undefined> => {
    try {
        let userModel = userEntity()
        //search by id
        return await userModel.deleteOne({ _id: id })
    } catch (error) {
        LogError(`[ORM ERROR]: Deleting users by id ${error}`)
    }
}
// -create new user
export const createUser = async (user: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity()
        //create new user
        return await userModel.create(user)

    } catch (error) {
        LogError(`[ORM ERROR]: creating user: ${error}`)
    }
}
// -update user by id
export const updateUserByid = async (id: string, user: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity()
        //update user
        return await userModel.findByIdAndUpdate(id, user)
    } catch (error) {
        LogError(`[ORM ERROR]: Updating user: ${id} ${error}`)
    }
}

//register user
export const registerUser = async (user: IUser): Promise<any | undefined> => {
    try {
        let userModel = userEntity()
        //create new user
        return await userModel.create(user)

    } catch (error) {
        LogError(`[ORM ERROR]: creating user: ${error}`)
    }
}

//login user

export const loginUser = async (auth: IAuht): Promise<any | undefined> => {
    try {
        let userModel = userEntity()

        let userFound: IUser | undefined = undefined
        let token = undefined
        // check if user exists by unique email
        await userModel.findOne({ email: auth.email }).then((user: IUser) => {
            userFound = user

        }).catch((error) => {
            console.error(`[ERROR AUTH IN ORM]: User not found`)
            throw new Error(`[ERROR AUTH IN ORM]: User not found: ${error}`);

        })
        //check if password is valid
        let validPassword = bcrypt.compareSync(auth.password, userFound!.password)
        if (!validPassword) {
            console.error(`[ERROR AUTH IN ORM]: password not valid`)
            throw new Error(`[ERROR AUTH IN ORM]: password not valid`);
        }

        //generated jwt 
        token = jwt.sign({ email: userFound!.email }, secret, {
            expiresIn: "2h"
        })

        return{
            user: userFound,
            token: token
        }

    } catch (error) {
        LogError(`[ORM ERROR]: creating user: ${error}`)
    }
}

//logout user
export const logoutUser = async (): Promise<any | undefined> => {

}