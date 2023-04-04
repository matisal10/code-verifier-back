import { BasicResponse, GoodbyeResponse } from "./types";
import { IgoodbyeController } from "./interfaces";
import { LogSucces } from "../utils/logger";

export class GoodbyeController implements IgoodbyeController {
    public async getMessage(name?: string): Promise<GoodbyeResponse> {
        LogSucces('[/api/goodbye] Get Request')
        return {
            message: `Goodbye ${name || "world!"}`,
            date: new Date().toLocaleDateString()
        }
    }

}