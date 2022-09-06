"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const users_1 = require("../model/users");
class User {
    constructor(login, pass) {
        this.login = login;
        this.password = pass;
    }
    userAuth(login, pass) {
        (0, users_1.getUsers)(login, pass);
    }
}
exports.User = User;
