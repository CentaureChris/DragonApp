"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objects = void 0;
class Objects {
    constructor(n, t, a, d, s, i) {
        this.name = n;
        this.type = t;
        this.attack = a;
        this.defense = d;
        this.slip = s;
        // this.dragon_id = did
        this.image = i;
    }
    setDragonid(id) {
        this.dragon_id = id;
    }
    getAttack() {
        return this.attack;
    }
}
exports.Objects = Objects;
