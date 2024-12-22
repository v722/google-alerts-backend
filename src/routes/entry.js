"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryRoute = void 0;
const express = require("express");
const entry_1 = require("../controller/entry");
exports.entryRoute = express.Router();
exports.entryRoute.get("/", entry_1.getEntries);
