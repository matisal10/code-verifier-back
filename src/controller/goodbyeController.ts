import { Get, Query, Route, Tags } from "tsoa";
import { GoodbyeResponse } from "./types";
import { IgoodbyeController } from "./interfaces";
import { LogSucces } from "../utils/logger";

@Route("/api/hello")
@Tags("HelloController")
export class GoodbyeController implements IgoodbyeController {
    /**
     * Endpoint to retreive a message "hello {name}" in JSON
     * @param {string| undefined} name Name of user to be greeted
     * @returns {GoodbyeController} Promise of Goodbyeresponse
     */
    @Get("/")
    public async getMessage(@Query()name?: string): Promise<GoodbyeResponse> {
        LogSucces('[/api/goodbye] Get Request')
        return {
            message: `Goodbye ${name || "world!"}`,
            date: new Date().toLocaleDateString()
        }
    }

}