"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDragons = void 0;
const mysql = require("mysql2");
let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "dragoncombat"
});
function getAllDragons() {
    return new Promise((result, rej) => {
        conn.query("SELECT * FROM dragon", (err, res) => {
            if (err)
                rej(err);
            else
                result(res);
        });
    });
}
exports.getAllDragons = getAllDragons;
