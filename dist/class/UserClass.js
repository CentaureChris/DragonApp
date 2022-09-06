"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const users_1 = require("../model/users");
class User {
    constructor(login, pass) {
        this.login = login;
        this.password = pass;
    }
    userAuth() {
        let user = (0, users_1.getUsers)(this.login, this.password);
        return user;
    }
}
exports.User = User;
