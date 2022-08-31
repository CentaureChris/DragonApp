"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDragon = exports.getById = exports.getAllDragons = void 0;
const mysql = require("mysql2");
let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "dragoncombat"
});
function getAllDragons() {
    return new Promise((result, rej) => {
        conn.query("SELECT d.id,d.name,d.level,d.attack,d.defense,d.slip, GROUP_CONCAT(obj.name) AS objects FROM dragon AS d LEFT JOIN equipment as eq ON d.id = eq.dragon_id LEFT JOIN object as obj ON eq.object_id = obj.id GROUP BY d.id", (err, res) => {
            if (err)
                rej(err);
            else
                result(res);
        });
    });
}
exports.getAllDragons = getAllDragons;
function getById(id) {
    return new Promise((result, rej) => {
        conn.query(`SELECT d.id,d.name,d.level,d.attack,d.defense,d.slip, GROUP_CONCAT(obj.name) AS objects FROM dragon AS d LEFT JOIN equipment as eq ON d.id = eq.dragon_id LEFT JOIN object as obj ON eq.object_id = obj.id WHERE d.id = ${id} GROUP BY d.id`, (err, res) => {
            if (err)
                rej(err);
            else
                result(res);
        });
    });
}
exports.getById = getById;
function addDragon(name) {
    return new Promise((result, rej) => {
        conn.query(`INSERT INTO dragon (id, name, level, attack, defense, slip) VALUES (NULL, ?, 1, 3, 2, 1);`, [name], (err, res) => {
            if (err)
                rej(err);
            else
                result(res);
        });
    });
}
exports.addDragon = addDragon;
