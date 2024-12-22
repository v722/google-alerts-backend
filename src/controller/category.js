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
exports.getCategories = void 0;
const handleResponse_1 = require("../common/handleResponse");
const category_1 = require("../models/category");
exports.getCategories = [
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const items = yield category_1.CategoryModel.find();
            return res.status(200).json((0, handleResponse_1.formatSuccessMessage)({ items }));
        }
        catch (error) {
            console.log("Get Feed: failed", error);
            return res.status((error === null || error === void 0 ? void 0 : error.status) || 400).json((0, handleResponse_1.formatErrorMessage)(error));
        }
    })
];
