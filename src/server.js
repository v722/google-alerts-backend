"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const config_1 = require("./config");
const express = require("express");
const db_1 = require("./db");
const routes_1 = require("./routes");
const app = express();
(0, db_1.default)().then(() => {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use("/v1", routes_1.router);
    app.listen(config_1.config.NODE_ENV, () => {
        console.log("App listening at: ", config_1.config.NODE_ENV);
    });
}).catch(err => {
    console.log("Unable to connect to database: ", JSON.stringify(err, null, 2));
});
