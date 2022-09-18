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
exports.Dragon = void 0;
const ObjectsClass_1 = require("../class/ObjectsClass");
const dragons_1 = require("../model/dragons");
const objects_1 = require("../model/objects");
class Dragon {
    constructor(id) {
        this.id = id;
        this.name = '';
        this.level = 1;
        this.attack = 3;
        this.defense = 2;
        this.slip = 1;
        // this.objects = undefined
        this.lifePoint = 100;
        // this.id = 
    }
    addObject(object) {
        var _a;
        (_a = this.objects) === null || _a === void 0 ? void 0 : _a.push(object);
    }
    fight(opponent) {
        let result = "";
        let turn = 1;
        while (this.lifePoint > 0 && opponent.lifePoint > 0) {
            if (turn % 2 == 0) {
                result += `${this.name} attack ${opponent.name}!...`;
                let slip = false;
                for (let i = 0; i <= opponent.slip; i++) {
                    let dice = Math.round(Math.random() * (6 - 1) + 1);
                    if (dice == 6) {
                        slip = true;
                        break;
                    }
                }
                if (slip == true) {
                    result += `${opponent.name} dodged the attack!...\n`;
                }
                else {
                    opponent.lifePoint -= this.attack > opponent.defense ? (this.attack - opponent.defense) : (opponent.defense - this.attack) / 2;
                    result += `${this.name} hit ${opponent.name} `;
                }
                turn++;
            }
            else {
                result += `${opponent.name} attack ${this.name}!...\n`;
                let slip = false;
                for (let i = 0; i <= this.slip; i++) {
                    let dice = Math.round(Math.random() * (6 - 1) + 1);
                    if (dice == 6) {
                        slip = true;
                        break;
                    }
                }
                if (slip == true) {
                    result += `${this.name} dodged the attack!...\n`;
                }
                else {
                    this.lifePoint -= opponent.attack > this.defense ? (opponent.attack - this.defense) : (this.defense - opponent.attack) / 2;
                    result += `${opponent.name} hit ${this.name} `;
                }
                turn++;
            }
            if (this.lifePoint <= 0) {
                result += `${opponent.name} WIN ${this.lifePoint} / ${opponent.lifePoint}`;
            }
            else if (opponent.lifePoint <= 0) {
                result += `${this.name} WIN ${this.lifePoint} / ${opponent.lifePoint}`;
            }
        }
        return result;
    }
    fetch() {
        (0, dragons_1.getById)(this.id).then((data) => __awaiter(this, void 0, void 0, function* () {
            this.name = data[0].name;
            this.attack = data[0].attack;
            this.defense = data[0].defense;
            this.slip = data[0].slip;
            this.level = data[0].level;
            this.rider = data[0].rider;
            this.avatar = data[0].avatar;
            if (data[0].objects != null) {
                let dataObj = data[0].objects.split(',');
                for (let obj of dataObj) {
                    if (typeof obj == 'number') {
                        yield (0, objects_1.getObjectById)(obj).then((data2) => {
                            let object = new ObjectsClass_1.Objects(data2[0].name, data2[0].type, data2[0].attack, data2[0].defense, data2[0].slip, data2[0].image);
                            console.log(object);
                        });
                    }
                }
            }
            else {
                let dataObj = data[0].objects;
            }
            // for(let obj of data[0].objects){
            //     await getObjectById(obj).then((data2:any) => {
            //         let Obj = new Objects(data2[0].name,data2[0].type,data2[0].attack,data2[0].defense,data2[0].slip,data2[0].image)
            //         cumAtk += Obj.attack
            //         this.addObject(Obj)
            //         if(this.id){
            //             Obj.setDragonid(this.id)
            //         }
            //     })
            // }
        }));
    }
}
exports.Dragon = Dragon;
