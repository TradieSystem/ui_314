/**
 * Route values
 */
export enum RoutesEnum {
    LOGIN = "login",
    REQUEST_HISTORY = "request_history",
    CREATE_REQUEST = "create_request",
    SIGN_UP = "signup",
    USER_MANAGEMENT = "user_management",
    AVAILABLE_REQUESTS = "available_requests",
    EDIT_PROFILE = "edit_profile",
    Security_question = 'question',
    Pro_Profile = "Professional"

}

/**
 * Default dev path --
 * use this for axios calls so we can easily change the path when we deploy
 */

export const DEV_PATH = "http://localhost:5000/v1";

export const CORS_HEADER = {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}