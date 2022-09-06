"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dragon = void 0;
const { getAllDragons, getById, addDragon, getOpponents } = require("../model/dragons");
class Dragon {
    constructor(n, l, at, d, s, o, id) {
        this.name = n;
        this.level = l;
        this.attack = at;
        this.defense = d;
        this.slip = s;
        this.objects = o;
        this.id = id;
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
