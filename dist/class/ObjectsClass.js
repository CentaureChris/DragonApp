"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objects = void 0;
const objects_1 = require("../model/objects");
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
    boost(a, d, s) {
        (0, objects_1.boostDragonsStats)(this.dragon_id, a, d, s).then((data) => {
            console.log(data);
        });
    }
}
exports.Objects = Objects;
