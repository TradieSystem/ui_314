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
    Pro_Profile = "Professional"

}

/**
 * Default dev path --
 * use this for axios calls so we can easily change the path when we deploy
 */

export const DEV_PATH = "https://63ssyxp81l.execute-api.us-east-1.amazonaws.com/dev";