"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bagCount = exports.clearEquipment = exports.addEquipment = exports.boostDragonsStats = exports.getObjectById = exports.getAllObjects = void 0;
const SingleDb_1 = require("../class/SingleDb");
let db = SingleDb_1.SingleDb.getInstance();
function getAllObjects() {
    return new Promise((result, rej) => {
        db.query(`SELECT * FROM object `, []).then((data) => {
            const retObj = data;
            result(retObj);
        }).catch((err) => {
            rej(err);
        });
    });
}
exports.getAllObjects = getAllObjects;
function getObjectById(id) {
    return new Promise((result, rej) => {
        db.query(`SELECT * FROM object WHERE object.id = ?`, [id]).then((data) => {
            const retObj = data;
            result(retObj);
        }).catch((err) => {
            rej(err);
        });
    });
}
exports.getObjectById = getObjectById;
function boostDragonsStats(id, a, d, s) {
    return new Promise((result, rej) => {
        db.query(`UPDATE dragon set attack = ${a},defense = ${d}, slip = ${s} WHERE id = ?`, [id]).then((data) => {
            const retObj = data;
            result(retObj);
        }).catch((err) => {
            rej(err);
        });
    });
}
exports.boostDragonsStats = boostDragonsStats;
function addEquipment(dragon, object) {
    return new Promise((result, rej) => {
        db.query(`INSERT INTO equipment (dragon_id, object_id)
            VALUES (?,?)`, [dragon, object]).then((data) => {
            const retObj = data;
            result(retObj);
        }).catch((err) => {
            rej(err);
        });
    });
}
exports.addEquipment = addEquipment;
function clearEquipment(dragon) {
    return new Promise((result, rej) => {
        db.query(`DELETE FROM equipment
        WHERE dragon_id = ?`, [dragon]).then((data) => {
            const retObj = data;
            result(retObj);
        }).catch((err) => {
            rej(err);
        });
    });
}
exports.clearEquipment = clearEquipment;
function bagCount(id) {
    return new Promise((result, rej) => {
        db.query(`SELECT COUNT(object_id) as count FROM equipment WHERE dragon_id = ?`, [id]).then((data) => {
            const retObj = data;
            result(retObj);
        }).catch((err) => {
            rej(err);
        });
    });
}
exports.bagCount = bagCount;
