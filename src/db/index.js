"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const config_1 = require("../config");
const appCode_1 = require("../constants/appCode");
const mongoose_1 = require("mongoose");
function connect(dbUrl, dbName, connectionOption) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!dbUrl) {
            throw {
                msg: appCode_1.AppError.DB_URL_NOT_FOUND,
                status: appCode_1.ErrorCode.NOT_FOUND
            };
        }
        if (!dbName) {
            throw {
                msg: appCode_1.AppError.DB_NAME_NOT_FOUND,
                status: appCode_1.ErrorCode.NOT_FOUND
            };
        }
        const client = yield mongodb_1.MongoClient.connect(dbUrl, connectionOption);
        return client.db(dbName);
    });
}
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            global.DB_URL_OBJ = yield connect(config_1.config.DB.URL, config_1.config.DB.NAME, { maxPoolSize: config_1.config.DB.POOL_SIZE.MAX, minPoolSize: config_1.config.DB.POOL_SIZE.MIN });
            yield mongoose_1.default.connect(config_1.config.DB.URL);
            console.log("Connected to database!");
            return { success: true };
        }
        catch (err) {
            console.error("Could not connect to mongodb");
            console.error(err.message);
            process.exit(1);
        }
    });
}
exports.default = default_1;
