import { IkastasController } from "./interfaces";
import { LogSucces, LogError, LogWarning } from "../utils/logger";
import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";

//ORM - katas collection
import { createKata, deleteKataByID, getAllKatas, getKatasByID, getKatasPerDif, getKatasPerValoration, getKatasRecent, getPerValoration, getSolution, orderByChances, updateKataByid, updateValorationByID } from "../domain/orm/kastas.orm";
import { updateUserByid } from "../domain/orm/user.orm";
import { IKata } from "@/domain/interfaces/IKata.interfaces";

@Route('/api/kata')
@Tags("katasController")
export class katasController implements IkastasController {

    @Post("/")
    public async createKata(@Query() kata: IKata, @Query() idUser: string): Promise<any> {
        let response: any = ''
        if (kata) {
            LogSucces(`[/api/kata] Create user :${kata.name}`)
            await createKata(kata, idUser).then((r) => {
                response = {
                    statu: 200,
                    message: `Kata created successfully`
                }
            })

        }
        else {
            LogWarning('[/api/kata] Create needs kata entity')
            response = {
                status: 400,
                message: 'please, provide an kata to create from database'
            }
        }

        return response
    }
    @Delete("/")
    public async deleteKata(@Query() id?: string, @Query() creatorId?: string): Promise<any> {
        let response: any = ''
        if (id && creatorId) {
            LogSucces(`[/api/kata] Delete user by id:${id}`)
            await deleteKataByID(id, creatorId).then((r) => {
                response = {
                    status: 200,
                    message: `Kata with id ${id} deleted successfully`
                }
            })
        }
        else {
            LogWarning('[/api/kata] Delete Kata request without id')
            response = {
                status: 400,
                message: 'please, provide an ID to remove from database'
            }
        }
        return response
    }
    @Get("/")
    public async getKatas(page: number, limit: number, dif?: number, id?: string): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucces(`[/api/kata] Get kata by id:${id}`)
            response = await getKatasByID(id)
        }
        else {
            // LogSucces(`[/api/kata] Get kata by id:${id}`)
            response = await getAllKatas(page, limit)
        }

        return response
    }
    @Get("/puntuacion")
    public async getPerValoration(): Promise<any> {
        let response: any = ''
        LogSucces(`[/api/katas] get katas recent`)
        return response = await getPerValoration()
    }

    @Get("/dificultad")
    public async getKatasPerDif(): Promise<any> {
        let response: any = ''
        LogSucces(`[/api/katas] get katas recent`)
        return response = await getKatasPerDif()
    }

    @Put("/")
    public async updateKata(id: string, kata: any, valoration: number, creatorId: string): Promise<any> {
        let response: any = ''
        if (id) {
            if (valoration) {
                LogSucces(`[/api/kata] Update kata by id:${id}`)
                response = await updateValorationByID(id, valoration)
            }
            else {
                LogSucces(`[/api/kata] Update kata by id:${id}`)
                await updateKataByid(id, kata, creatorId).then((r) => {
                    response = {
                        status: 200,
                        message: `kata update: ${kata.name}`
                    }
                })
            }

        }
        else {
            LogWarning('[/api/kata] Update kata request without id')
            response = {
                message: 'please, provide an ID to upoate from database'
            }
        }
        return response
    }
    @Get("/changes")
    public async getKatasOderByChances(): Promise<any> {
        let response: any = ''
        LogSucces(`[/api/katas] get katas recent`)
        return response = await orderByChances()
    }
    @Put("/solucion")
    public async getSolution(id: string): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucces(`[/api/katas] get katas recent`)
            await getSolution(id).then((r) => {
                response = {
                    status: 200,
                    message: `solution is: ${r}`
                }
            })
        }
        else {
            LogWarning('[/api/kata] Update kata request without id')
            response = {
                message: 'please, provide an ID to get solution from database'
            }
        }
        return response
    }


}
