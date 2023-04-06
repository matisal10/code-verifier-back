import { IkastasController } from "./interfaces";
import { LogSucces, LogError, LogWarning } from "../utils/logger";

//ORM - katas collection
import { getAllKatas, getKatasByID, getKatasPerDif, getKatasRecent, getPerValoration, orderByChances, updateValorationByID } from "../domain/orm/kastas.orm";
import { updateUserByid } from "../domain/orm/user.orm";


export class katasController implements IkastasController {
    
    public async getKatas(dif?: number): Promise<any> {
        let response: any = ''
        if (dif) {
            LogSucces(`[/api/kata] Get kata by id:${dif}`)
            response = await getKatasPerDif(dif)
        }
        else {
            LogSucces(`[/api/katas] get katas recent`)
            response = await getKatasRecent()
        }
        return response
    }

    public async getPerValoration(): Promise<any> {
        let response: any = ''
        LogSucces(`[/api/katas] get katas recent`)
        return response = await getPerValoration()
    }

    public async updateKatas(id: string, kata: any, valoration:number): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucces(`[/api/kata] Update kata by id:${id}`)
            return response = await updateValorationByID(id, kata,valoration)
        }
        else {
            LogWarning('[/api/kata] Update kata request without id')
            response = {
                message: 'please, provide an ID to upoate from database'
            }
        }
        return response
    }
    public async getKatasOderByChances(): Promise<any> {
        let response: any = ''
        LogSucces(`[/api/katas] get katas recent`)
        return response = await orderByChances()
    }

}
