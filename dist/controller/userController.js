"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../model/users");
function userAuth() {
    (0, users_1.getUsers)();
}
exports.default = userAuth;
