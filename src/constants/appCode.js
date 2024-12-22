"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSuccess = exports.ErrorCode = exports.AppError = void 0;
var AppError;
(function (AppError) {
    AppError["UNAUTHORIZED"] = "Unauthorized";
    AppError["DB_URL_NOT_FOUND"] = "Db url not found";
    AppError["DB_NAME_NOT_FOUND"] = "Db name not found";
    AppError["FEED_ALREADY_EXIST"] = "Feed already exist";
})(AppError = exports.AppError || (exports.AppError = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    ErrorCode[ErrorCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ErrorCode[ErrorCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
var AppSuccess;
(function (AppSuccess) {
    AppSuccess["SUCCESS"] = "success";
    AppSuccess["MESSAGE"] = "API Operation successful";
})(AppSuccess = exports.AppSuccess || (exports.AppSuccess = {}));
