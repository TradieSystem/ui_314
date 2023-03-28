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
    AVAILABLE_REQUESTS = "available_requests",
    EDIT_PROFILE = "edit_profile",
    PASSWORD = 'password',
}

/**
 * Default dev path --
 * use this for axios calls so we can easily change the path when we deploy
 */

export const DEV_PATH = "http://localhost:3000";

