export enum AppError {
    UNAUTHORIZED = "Unauthorized",
    DB_URL_NOT_FOUND = "Db url not found",
    DB_NAME_NOT_FOUND = "Db name not found",
    FEED_ALREADY_EXIST = "Feed already exist",
}

export enum ErrorCode {
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
    BAD_REQUEST = 400
}

export enum AppSuccess {
    SUCCESS = "success",
    MESSAGE = "API Operation successful"
}