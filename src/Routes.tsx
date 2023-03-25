/**
 * Route values
 */
export enum RoutesEnum {
    LOGIN = "login",
    HOME = "home",
    REQUEST_HISTORY = "request_history",
    CREATE_REQUEST = "create_request",
    SIGN_UP = "signup",
    USER_MANAGEMENT = "user_management",
    AVAILABLE_REQUESTS = "available_requests"
}

/**
 * Default dev path --
 * use this for axios calls so we can easily change the path when we deploy
 */
export const DEVPATH = "http://localhost:3000";