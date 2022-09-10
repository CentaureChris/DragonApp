"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dragon = void 0;
const { getAllDragons, getById, addDragon, getOpponents } = require("../model/dragons");
class Dragon {
    constructor(n) {
        this.name = n;
        this.level = 1;
        this.attack = 3;
        this.defense = 3;
        this.slip = 1;
        this.objects = undefined;
        // this.id = 
    }
    setId(id) {
        this.id = id;
    }
    setLevel(level) {
        this.level = level;
    }
    setAttack(attack) {
        this.attack = attack;
    }
    setDefense(defense) {
        this.defense = defense;
    }
    setSlip(slip) {
        this.slip = slip;
    }
    setRider(rider) {
        this.rider = rider;
    }
    setAvatar(avatar) {
        this.avatar = avatar;
    }
    addObject(object) {
        var _a;
        (_a = this.objects) === null || _a === void 0 ? void 0 : _a.push(object);
    }
}
exports.Dragon = Dragon;
