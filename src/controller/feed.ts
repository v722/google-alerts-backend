import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { formatErrorMessage, formatSuccessMessage } from "../common/handleResponse";
import { IFeed } from "../interface";
import { CategoryModel } from "../models/category";
import { FeedModel } from "../models/feed";
import { EntryModel } from "../models/entry";
import { AppError, ErrorCode } from "../constants/appCode";
import * as Parser from "rss-parser";
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PROMPT } from "../constants";
import { cleanRssTitle } from "../common/utils";
import OpenAI from "openai";
import { config } from "../config";
const openai = new OpenAI({ apiKey: config.OPEN_AI_KEY });

let parser = new Parser();

export const createFeed = [
    async (req: Request, res: Response) => {
        try {
            const { category_name, url } = req.body;
            if (!category_name) {
                throw { msg: AppError.CATEGORY_NAME_NOT_FOUND, status: ErrorCode.NOT_FOUND }
            }
            if (!url) {
                throw { msg: AppError.URL_NOT_FOUND, status: ErrorCode.NOT_FOUND }
            }
            const data = await parser.parseURL(url);
            const feedsExist = await FeedModel.findOne({ link: data?.link });
            if (feedsExist) {
                throw { msg: AppError.FEED_ALREADY_EXIST, status: ErrorCode.NOT_FOUND }
            }
            const categoryData = await CategoryModel.findOne({ name: category_name });
            let category_id = categoryData?._id?.toString();
            if (!categoryData) {
                const category = new CategoryModel({ name: category_name });
                const res = await category.save();
                category_id = res._id?.toString();
            }
            const feedPayload: IFeed = {
                category_id: category_id,
                lastBuildDate: data?.lastBuildDate,
                link: data?.link,
                feedUrl: data?.feedUrl,
                title: cleanRssTitle(data?.title),
                updated_at: data?.updated,
            }
            const feed = new FeedModel(feedPayload);
            const feedData = await feed.save();


            const entries = await openAIInsertion(data, feedData, category_name);
            await EntryModel.bulkWrite(entries);
            return res.status(200).json(formatSuccessMessage());
        } catch (error) {
            console.log("Create Feed: failed", error?.message);
            return res.status(error?.status || 400).json(formatErrorMessage(error));
        }
    }
];

export const fetchAndDumpLatestFeed = [
    async (req: Request, res: Response) => {
        try {
            const feed_id = req.body.feed_id;
            const feedDetail = await FeedModel.findOne({ _id: new ObjectId(feed_id) });
            const data = await parser.parseURL(feedDetail?.feedUrl);
            await FeedModel.updateOne(
                { _id: new ObjectId(feed_id) },
                {
                    $set: { lastBuildDate: data?.lastBuildDate, updated_at: data?.updated }
                });
            const category = await CategoryModel.findOne({ _id: new ObjectId(feedDetail?.category_id )});
            const entries = await openAIInsertion(data, feedDetail, category?.name);
            console.log("entries", entries.length);
            await EntryModel.bulkWrite(entries);
            return res.status(200).json(formatSuccessMessage());
        } catch (error) {
            console.log("Fetch and dump Feed: failed", error);
            return res.status(error?.status || 400).json(formatErrorMessage(error));
        }
    }
]

export const getFeeds = [
    async (req: Request, res: Response) => {
        try {
            const { search, category_id } = req.query;
            let whereCondition = {};
            if (search !== "null" && search !== "undefined") {
                whereCondition = { $or: [{ title: { $regex: search, $options: "i" } }] }
            }
            if (category_id !== "null" && category_id !== "undefined") {
                whereCondition = {
                    ...whereCondition,
                    category_id
                }
            }
            const items = await FeedModel.find(whereCondition).sort({ created_at: -1 }).limit(DEFAULT_ITEMS_PER_PAGE);
            return res.status(200).json(formatSuccessMessage({ items }));
        } catch (error) {
            console.log("Get Feed: failed", error);
            return res.status(error?.status || 400).json(formatErrorMessage(error));
        }
    }
];

const openAIInsertion = async (data, feedData, category_name) => {
    try {
        const entries: any[] = [], promptJSON = [];
        for (const entry of data?.items?.slice(0, 20)) {
            const promptPayload = {
                id: entry?.id,
                link: entry?.link,
                title: cleanRssTitle(entry?.title),
                content: entry?.content,
                pubDate: entry?.pubDate,
                comments: entry?.comments,
                created_at: new Date(),
                feed_id: feedData?._id?.toString(),
                author: entry?.author,
                contentSnippet: entry?.contentSnippet,
            }
            promptJSON.push(promptPayload);
        }
        let filterData;
        try {
            const completion = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: DEFAULT_PROMPT(promptJSON, category_name) as any,
            });
            filterData = completion?.choices?.[0].message?.content;
        } catch (error) {
            console.log("error", error);
        }
        if (!filterData || filterData !== "") {
            for (const entry of promptJSON) {
                const bulkWrite = {
                    updateOne: {
                        filter: { id: entry?.id },
                        update: {
                            $set: entry
                        },
                        upsert: true
                    },
                }
                entries.push(bulkWrite);
            }
        } else {
            const ids = filterData.split(", ");
            const filterJson = ids?.length > 0 && promptJSON?.filter(ele => ids.includes(ele.id));
            for (const entry of filterJson) {
                const bulkWrite = {
                    updateOne: {
                        filter: { id: entry?.id },
                        update: {
                            $set: entry
                        },
                        upsert: true
                    },
                }
                entries.push(bulkWrite);
            }
        }
        return entries;
    } catch (error) {
        console.log("error", error);
        throw { msg: error?.message, error };
    }
}