"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boostDragonsStats = exports.getObjectById = exports.getAllObjects = void 0;
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
function getObjectById(id) {
    return new Promise((result, rej) => {
        conn.query(`SELECT * FROM object WHERE object.id = ${id}`, (err, res) => {
            if (err)
                rej(err);
            else
                result(res);
        });
    });
}
exports.getObjectById = getObjectById;
function boostDragonsStats(id, a, d, s) {
    return new Promise((result, rej) => {
        conn.query(`UPDATE dragon set attack = ${a},defense = ${d}, slip = ${s} WHERE id = ${id}`, (err, res) => {
            if (err)
                rej(err);
            else
                result(res);
        });
    });
}
exports.boostDragonsStats = boostDragonsStats;
