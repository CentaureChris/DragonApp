"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const { getAllDragons } = require("./model/dragons");
// const dotenv = require('dotenv');
// dotenv.config();
const app = (0, express_1.default)();
const port = 3000;
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get('/', (req, res) => {
    getAllDragons().then((data) => {
        res.render("index", { dragons: data });
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
