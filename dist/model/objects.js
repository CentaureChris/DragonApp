"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllObjects = void 0;
const mysql = require("mysql2");
let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "dragoncombat"
});
function getAllObjects() {
    return new Promise((result, rej) => {
        conn.query(`SELECT * FROM object `, (err, res) => {
            if (err)
                rej(err);
            else
                result(res);
        });
    });
}
exports.getAllObjects = getAllObjects;
