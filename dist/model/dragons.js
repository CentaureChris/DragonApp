"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpponents = exports.addDragon = exports.getById = exports.getAllDragons = void 0;
const mysql = require("mysql2");
let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "dragoncombat"
});
function getAllDragons(idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((result, rej) => {
            conn.query(`SELECT d.id,d.name,d.level,d.attack,d.defense,d.slip,d.rider,a.image as avatar, GROUP_CONCAT(obj.id) AS objects FROM dragon AS d LEFT JOIN equipment as eq ON d.id = eq.dragon_id LEFT JOIN object as obj ON eq.object_id = obj.id LEFT JOIN avatar as a ON a.id = d.avatar WHERE d.rider = ${idUser} GROUP BY d.id `, (err, res) => {
                if (err)
                    rej(err);
                else
                    result(res);
            });
        });
    });
}
exports.getAllDragons = getAllDragons;
function getById(id) {
    return new Promise((result, rej) => {
        conn.query(`SELECT d.id,d.name,d.level,d.attack,d.defense,d.slip,d.rider,a.image as avatar, GROUP_CONCAT(obj.name) AS objects FROM dragon AS d LEFT JOIN equipment as eq ON d.id = eq.dragon_id LEFT JOIN object as obj ON eq.object_id = obj.id LEFT JOIN avatar as a ON a.id = d.avatar WHERE d.id = ${id} GROUP BY d.id `, (err, res) => {
            if (err)
                rej(err);
            else
                result(res);
        });
    });
}
exports.getById = getById;
function addDragon(name, rider) {
    return new Promise((result, rej) => {
        conn.query(`INSERT INTO dragon (id, name, level, attack, defense, slip,rider,avatar) VALUES (NULL, ?, 1, 3, 2, 1,?,1);`, [name, rider], (err, res) => {
            if (err)
                rej(err);
            else
                result(res);
        });
    });
}
exports.addDragon = addDragon;
function getOpponents(id) {
    return new Promise((result, rej) => {
        conn.query(`SELECT d.id,d.name,d.level,d.attack,d.defense,d.slip,d.rider,a.image as avatar, GROUP_CONCAT(obj.name) AS objects FROM dragon AS d LEFT JOIN equipment as eq ON d.id = eq.dragon_id LEFT JOIN object as obj ON eq.object_id = obj.id LEFT JOIN avatar as a ON a.id = d.avatar WHERE d.rider != ${id} GROUP BY d.id `, (err, res) => {
            if (err)
                rej(err);
            else
                result(res);
        });
    });
}
exports.getOpponents = getOpponents;
