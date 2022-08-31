"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dragon = void 0;
class Dragon {
    constructor(n, l, a, d, s) {
        this.name = n;
        this.level = l;
        this.attack = a;
        this.defense = d;
        this.slip = s;
        this.objects = [];
    }
}
exports.Dragon = Dragon;
