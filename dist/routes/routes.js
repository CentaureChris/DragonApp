"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserClass_1 = require("../class/UserClass");
let router = express_1.default.Router();
router.route("/")
    .get((req, res) => {
    let errMsg = "";
    console.log('first');
    res.render('login', { info: errMsg });
});
router.route("/auth")
    .post((req, res) => {
    let username = req.body.login;
    let password = req.body.password;
    let user = new UserClass_1.User(username, password);
    let userData = user.userAuth();
});
module.exports = router;
