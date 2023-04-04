import { BasicResponse } from "./types";
import { IhelloController } from "./interfaces";
import { LogSucces } from "../utils/logger";

export class HelloController implements IhelloController {
    public async getMessage(name?: string): Promise<BasicResponse> {
        LogSucces('[/api/hello] Get Request')
        return {
            message: `Hello ${name || "world!"}`
        }
    }

}