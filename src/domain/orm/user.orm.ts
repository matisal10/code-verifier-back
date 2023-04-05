import { userEntity } from "../entities/User.entity";
import { LogError, LogSucces } from "../../utils/logger";

// crud

/**
 * method to obtain all users from collection "users" in mongo server
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity()
        //search
        return await userModel.find({ })
    } catch (error) {
        LogError(`[ORM ERROR]: Getting all users ${error}`)
    }
}

// todo: 
// -get user by id
// -get user by email
// -delete user by id
// -create new user
// -update user by id