// basic json response for controllers

export type BasicResponse = {
    message: string
}

export type GoodbyeResponse = {
    message: string
    date: string
}

/**
 * Error json response for controllers
 */

export type ErrorResponse = {
    error: string,
    message: string
}

export type AuthResponse = {
    message: string
    token: string
}