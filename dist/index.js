"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes = require('./routes/router');
const { getAllDragons, getById, addDragon, getOpponents } = require("./model/dragons");
var cookieSession = require("cookie-session");
// const dotenv = require('dotenv');
// dotenv.config();
const app = (0, express_1.default)();
const port = 3000;
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express_1.default.json());
app.use(express_1.default.static(__dirname + '/assets'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieSession({
    username: 'session',
    loggedin: false,
    keys: ['key1', 'key2'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use("/", routes);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
