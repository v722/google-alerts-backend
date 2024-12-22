import * as express from "express";
import { createFeed, fetchAndDumpLatestFeed, getFeeds } from "../controller/feed";
export const feedRoute = express.Router();

feedRoute.post("/", createFeed);

feedRoute.post("/refetch", fetchAndDumpLatestFeed);

feedRoute.get("/", getFeeds);