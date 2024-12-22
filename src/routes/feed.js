"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedRoute = void 0;
const express = require("express");
const feed_1 = require("../controller/feed");
exports.feedRoute = express.Router();
exports.feedRoute.post("/", feed_1.createFeed);
exports.feedRoute.get("/", feed_1.getFeeds);
