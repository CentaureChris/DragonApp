"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.getUsers = void 0;
const mysql = require("mysql2");
let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "dragoncombat"
});
function getUsers(login, pass) {
    return new Promise((result, rej) => {
        conn.query('SELECT * FROM user WHERE login = ? AND password = ?', [login, pass], function (error, res) {
            if (error) {
                throw error;
            }
            else {
                result(res);
            }
        });
    });
}
exports.getUsers = getUsers;
function addUser(login, pass) {
    return new Promise((result, reg) => {
        conn.query('INSERT INTO `user` (`id`, `login`, `password`) VALUES (NULL, ?, ?);', [login, pass], (error, res) => {
            if (error) {
                throw error;
            }
            else {
                result(res);
            }
        });
    });
}
exports.addUser = addUser;
