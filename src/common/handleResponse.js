"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatErrorMessage = exports.formatSuccessMessage = void 0;
const appCode_1 = require("../constants/appCode");
function formatSuccessMessage(data) {
    return {
        success: true,
        msg: appCode_1.AppSuccess.MESSAGE,
        data
    };
}
exports.formatSuccessMessage = formatSuccessMessage;
function formatErrorMessage(error, data) {
    return {
        success: false,
        code: (error === null || error === void 0 ? void 0 : error.status) || 400,
        msg: (error === null || error === void 0 ? void 0 : error.msg) || JSON.stringify(error),
        data
    };
}
exports.formatErrorMessage = formatErrorMessage;
