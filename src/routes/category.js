"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express = require("express");
const category_1 = require("../controller/category");
exports.categoryRoute = express.Router();
exports.categoryRoute.get("/", category_1.getCategories);
