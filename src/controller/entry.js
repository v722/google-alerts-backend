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
exports.getEntries = void 0;
const entry_1 = require("../models/entry");
const handleResponse_1 = require("../common/handleResponse");
const constants_1 = require("../constants");
exports.getEntries = [
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { feed_id } = req.query;
            const limit = req.query.limit ? Number(req.query.limit) : constants_1.DEFAULT_ITEMS_PER_PAGE, page = req.query.page ? Number(req.query.page) : constants_1.DEFAULT_PAGE_NUMBER;
            const totalCount = yield entry_1.EntryModel.count({ feed_id });
            const items = yield entry_1.EntryModel.find({ feed_id }).skip((limit * page) - limit).limit(limit);
            return res.status(200).json((0, handleResponse_1.formatSuccessMessage)({
                totalCount,
                items,
                page,
            }));
        }
        catch (error) {
            console.log("Get Feed: failed", error);
            return res.status((error === null || error === void 0 ? void 0 : error.status) || 400).json((0, handleResponse_1.formatErrorMessage)(error));
        }
    })
];
