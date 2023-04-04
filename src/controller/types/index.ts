// basic json response for controllers

export type BasicResponse = {
    message: string
}

/**
 * Error json response for controllers
 */

export type ErrorResponse = {
    error: string,
    message: string
}