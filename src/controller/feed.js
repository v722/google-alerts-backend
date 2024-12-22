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
exports.getFeeds = exports.createFeed = void 0;
const handleResponse_1 = require("../common/handleResponse");
const category_1 = require("../models/category");
const feed_1 = require("../models/feed");
const entry_1 = require("../models/entry");
const appCode_1 = require("../constants/appCode");
const Parser = require("rss-parser");
const constants_1 = require("../constants");
let parser = new Parser();
exports.createFeed = [
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const { category_name, url, keyword } = req.body;
            const data = yield parser.parseURL(url);
            const feedsExist = yield feed_1.FeedModel.findOne({ feedUrl: data === null || data === void 0 ? void 0 : data.feedUrl });
            if (feedsExist) {
                throw { msg: appCode_1.AppError.FEED_ALREADY_EXIST, status: appCode_1.ErrorCode.NOT_FOUND };
            }
            const categoryData = yield category_1.CategoryModel.findOne({ name: category_name });
            let category_id = (_a = categoryData === null || categoryData === void 0 ? void 0 : categoryData._id) === null || _a === void 0 ? void 0 : _a.toString();
            if (!categoryData) {
                const category = new category_1.CategoryModel({ name: category_name });
                const res = yield category.save();
                category_id = (_b = res._id) === null || _b === void 0 ? void 0 : _b.toString();
            }
            const feedPayload = {
                category_id: category_id,
                lastBuildDate: data === null || data === void 0 ? void 0 : data.lastBuildDate,
                link: data === null || data === void 0 ? void 0 : data.link,
                feedUrl: data === null || data === void 0 ? void 0 : data.feedUrl,
                keyword,
                title: data === null || data === void 0 ? void 0 : data.title,
                updated_at: data === null || data === void 0 ? void 0 : data.updated,
            };
            const feed = new feed_1.FeedModel(feedPayload);
            const feedData = yield feed.save();
            const entries = [];
            for (const entry of data.items) {
                const bulkWrite = {
                    updateOne: {
                        filter: { title: entry === null || entry === void 0 ? void 0 : entry.title },
                        update: {
                            $set: {
                                id: entry === null || entry === void 0 ? void 0 : entry.id,
                                link: entry === null || entry === void 0 ? void 0 : entry.link,
                                title: entry === null || entry === void 0 ? void 0 : entry.title,
                                content: entry === null || entry === void 0 ? void 0 : entry.content,
                                pubDate: entry === null || entry === void 0 ? void 0 : entry.pubDate,
                                comments: entry === null || entry === void 0 ? void 0 : entry.comments,
                                created_at: new Date(),
                                feed_id: (_c = feedData === null || feedData === void 0 ? void 0 : feedData._id) === null || _c === void 0 ? void 0 : _c.toString(),
                                author: entry === null || entry === void 0 ? void 0 : entry.author,
                                contentSnippet: entry === null || entry === void 0 ? void 0 : entry.contentSnippet,
                            }
                        },
                        upsert: true
                    },
                };
                entries.push(bulkWrite);
            }
            yield entry_1.EntryModel.bulkWrite(entries);
            return res.status(200).json((0, handleResponse_1.formatSuccessMessage)());
        }
        catch (error) {
            console.log("Create Feed: failed", error);
            return res.status((error === null || error === void 0 ? void 0 : error.status) || 400).json((0, handleResponse_1.formatErrorMessage)(error));
        }
    })
];
exports.getFeeds = [
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { search, category_id } = req.query;
            let whereCondition = {};
            if (search) {
                whereCondition = { $or: [{ title: { $regex: search, $options: "i" } }] };
            }
            if (category_id !== "null") {
                whereCondition = Object.assign(Object.assign({}, whereCondition), { category_id });
            }
            const items = yield feed_1.FeedModel.find(whereCondition).sort({ created_at: -1 }).limit(constants_1.DEFAULT_ITEMS_PER_PAGE);
            return res.status(200).json((0, handleResponse_1.formatSuccessMessage)({ items }));
        }
        catch (error) {
            console.log("Get Feed: failed", error);
            return res.status((error === null || error === void 0 ? void 0 : error.status) || 400).json((0, handleResponse_1.formatErrorMessage)(error));
        }
    })
];
