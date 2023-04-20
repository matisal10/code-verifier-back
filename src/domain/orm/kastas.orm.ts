import { kataEntity } from "../entities/kata.entity";
import { LogError, LogSucces, LogInfo } from '../../utils/logger';
import { IKata } from "../interfaces/IKata.interfaces";
import { userEntity } from "../entities/User.entity";

// crud

/**
 * method to obtain all users from collection "users" in mongo server
 */
export const getAllKatas = async (page: number, limit: number): Promise<any[] | undefined> => {
    try {
        let katasModel = kataEntity()
        let response: any = {}
        await katasModel.find()
            .sort({ date: -1 })
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((katas: IKata[]) => {
                // users.forEach((user: IUser) => {
                //     //clean passwords from result
                //     user.password = ''
                // })
                response.katas = katas
            })
        // count total document in collection "Users"
        await katasModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit) // number page generated through the limit
            response.currentPage = page
        })

        return response
        // //search
        // return await katasModel.find({})
    } catch (error) {
        LogError(`[ORM ERROR]: Getting all katas ${error}`)
    }
}

export const getKatasByID = async (id: string): Promise<any | undefined> => {
    try {
        let katasModel = kataEntity()
        //search by id
        return await katasModel.findById(id)
    } catch (error) {
        LogError(`[ORM ERROR]: Getting katas by id ${error}`)
    }
}

export const deleteKataByID = async (id: string, creatorId: string): Promise<any | undefined> => {
    try {
        let katasModel = kataEntity()
        let kata = await katasModel.findOne({ _id: id })

        if (kata.creatorId === creatorId) {
            return await katasModel.deleteOne({ _id: id })
        } else {
            throw new Error("Unauthorized to delete this kata")
        }
    } catch (error) {
        LogError(`[ORM ERROR]: Deleting katas by id \${error}`)
    }
}

export const getKatasPerDif = async (dif: string): Promise<any[] | undefined> => {
    try {
        let katasModel = kataEntity()
        //search
        return await katasModel.find().sort({ level: -1 })
    } catch (error) {
        LogError(`[ORM ERROR]: Getting per dif katas ${error}`)
    }
}

export const getKatasPerValoration = async (valoration: number): Promise<any[] | undefined> => {
    try {
        let katasModel = kataEntity()
        //search
        return await katasModel.find().sort({ valoration: -1 })
    } catch (error) {
        LogError(`[ORM ERROR]: Getting per dif katas ${error}`)
    }
}

export const createKata = async (kata: IKata, idUser: string): Promise<any[] | undefined> => {
    try {
        let katasModel = kataEntity()
        let userModel = userEntity()
        const result = await katasModel.create(kata);
        const kataId = result._id;

        await userModel.updateOne({ _id: idUser }, { $push: { katas: kataId } });
        //create
        return await kataId
    } catch (error) {
        LogError(`[ORM ERROR]: Creating kata ${error}`)
    }
}

export const updateKataByid = async (id: string, kata: IKata,creatorId: string): Promise<any | undefined> => {
    try {
        let katasModel = kataEntity()
        let kata = await katasModel.findOne({ _id: id })

        if (kata.creatorId === creatorId) {
            return await katasModel.findByIdAndUpdate(id, kata)
        } else {
            throw new Error("Unauthorized to delete this kata")
        }
    } catch (error) {
        LogError(`[ORM ERROR]: Updating kata: ${id} ${error}`)
    }
}

export const getKatasRecent = async (page: number, limit: number): Promise<any[] | undefined> => {
    try {
        let katasModel = kataEntity()
        let response: any = {}
        await katasModel.find()
            .sort({ date: -1 })
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((katas: any[]) => {
                // users.forEach((user: IUser) => {
                //     //clean passwords from result
                //     user.password = ''
                // })
                response.katas = katas
            })
        // count total document in collection "Users"
        await katasModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit) // number page generated through the limit
            response.currentPage = page
        })

        return response
        //search
        // return await katasModel.find().sort({ date: -1 }).limit(5)
    } catch (error) {
        LogError(`[ORM ERROR]: Getting recent katas ${error}`)
    }
}

export const getPerValoration = async (): Promise<any[] | undefined> => {
    try {
        let katasModel = kataEntity()
        //search
        return await katasModel.find().sort({ valoration: -1 })
    } catch (error) {
        LogError(`[ORM ERROR]: Getting per valoration katas ${error}`)
    }
}

export const orderByChances = async (): Promise<any[] | undefined> => {
    try {
        let katasModel = kataEntity()
        //search
        return await katasModel.find().sort({ chances: -1 })
    } catch (error) {
        LogError(`[ORM ERROR]: Getting order chance katas ${error}`)
    }
}

export const updateValorationByID = async (id: string, kata: any, valoration: number): Promise<any> => {
    try {
        let katasModel = kataEntity()
        //search
        const kat = await katasModel.findById(id)
        const nuevoPromedio = ((kat.valoration * kat.num_valorations) + valoration) / (kat.num_valorations + 1);
        console.log(kat.valoration, kat.num_valorations, valoration)
        return await katasModel.updateOne({ _id: id }, { $set: { valoration: nuevoPromedio.toFixed(1) }, $inc: { num_valorations: 1 } });
    } catch (error) {
        LogError(`[ORM ERROR]: Getting per valoration katas ${error}`)
    }
}


