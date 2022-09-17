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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DragonClass_1 = require("../class/DragonClass");
const ObjectsClass_1 = require("../class/ObjectsClass");
const users_1 = require("../model/users");
const objects_1 = require("../model/objects");
const dragons_1 = require("../model/dragons");
const app = (0, express_1.default)();
let router = express_1.default.Router();
router.route('/')
    .get((req, res) => {
    let errMsg = "";
    res.render('login', { info: errMsg });
});
router.route("/auth")
    .post((req, res) => {
    let username = req.body.login;
    let password = req.body.password;
    if (username && password) {
        (0, users_1.getUsers)(username, password).then((data) => {
            if (data.length > 0) {
                let idUser = data[0].id;
                if (req.session) {
                    req.session.username = username;
                    req.session.loggedin = true;
                    res.redirect(`/list/${idUser}`);
                }
            }
            else {
                let errMsg = "Incorrect Username/Password!";
                res.render('login', { info: errMsg });
            }
        });
    }
    else {
        let errMsg = "Please enter Username and Password!";
        res.render('login', { info: errMsg });
        res.end();
    }
});
router.route('/register')
    .get((req, res) => {
    res.render('register');
})
    .post((req, res) => {
    let username = req.body.login;
    let password = req.body.password;
    if (username && password) {
        (0, users_1.addUser)(username, password).then((data) => {
            res.redirect('/');
        });
    }
    else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});
router.route('/logout')
    .get((req, res) => {
    if (req.session) {
        req.session.username = "";
        req.session.loggedin = false;
        res.redirect('/');
    }
});
router.route('/list/:id')
    .get((req, res) => {
    if (req.session && req.session.loggedin == true && req.session !== null && req.session !== undefined) {
        let idUser = parseInt(req.params.id);
        let dragonsList = [];
        (0, dragons_1.getAllDragons)(idUser).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            for (let d of data) {
                if (typeof d.objects === 'string') {
                    d.objects = d.objects.split(',');
                }
                let dragon = new DragonClass_1.Dragon(d.id);
                dragon.name = d.name;
                dragon.addObject(d.objects);
                dragon.attack = d.attack;
                dragon.defense = d.defense;
                dragon.slip = d.slip;
                dragon.level = d.level;
                dragon.avatar = d.avatar;
                dragon.rider = d.rider;
                if (d.objects !== null) {
                    dragon.objects = [];
                    for (let obj of d.objects) {
                        yield (0, objects_1.getObjectById)(obj).then((data2) => {
                            let Obj = new ObjectsClass_1.Objects(data2[0].name, data2[0].type, data2[0].attack, data2[0].defense, data2[0].slip, data2[0].image);
                            dragon.addObject(Obj);
                        });
                    }
                }
                dragonsList.push(dragon);
            }
            // console.log(dragonsList)
            if (req.session !== undefined && req.session !== null) {
                res.render("list", { dragons: dragonsList, idUser: idUser, user: req.session.username });
            }
        }));
    }
});
router.route('/detail/:id/:object')
    .get((req, res) => {
    let idObj = parseInt(req.params.object);
    let idDrag = parseInt(req.params.id);
    let dragon = new DragonClass_1.Dragon(idDrag);
    (0, objects_1.bagCount)(idDrag).then((data) => {
        let bagCount = data[0].count;
        if (bagCount < 3) {
            (0, objects_1.addEquipment)(idDrag, idObj).then((data) => {
                res.redirect(`/detail/${idDrag}`);
            });
        }
    });
});
router.route('/clearbag/:id')
    .get((req, res) => {
    let idDrag = parseInt(req.params.id);
    (0, objects_1.clearEquipment)(idDrag).then((data) => {
        res.redirect(`/detail/${idDrag}`);
    });
});
router.route("/detail/:id")
    .get((req, res) => {
    if (req.session && req.session.loggedin == true) {
        (0, dragons_1.getById)(parseInt(req.params.id)).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (typeof data[0].objects == "string") {
                data[0].objects = data[0].objects.split(',');
            }
            let dragon = new DragonClass_1.Dragon(data[0].name);
            dragon.id = data[0].id;
            dragon.attack = data[0].attack;
            dragon.defense = data[0].defense;
            dragon.slip = data[0].slip;
            dragon.level = data[0].level;
            dragon.avatar = data[0].avatar;
            if (data[0].rider)
                dragon.rider = data[0].rider;
            dragon.objects = [];
            let cumAtk = 0;
            if (data[0].objects)
                for (let obj of data[0].objects) {
                    yield (0, objects_1.getObjectById)(obj).then((data2) => {
                        let Obj = new ObjectsClass_1.Objects(data2[0].name, data2[0].type, data2[0].attack, data2[0].defense, data2[0].slip, data2[0].image);
                        cumAtk += Obj.attack;
                        dragon.addObject(Obj);
                        if (dragon.id) {
                            Obj.setDragonid(dragon.id);
                        }
                    });
                }
            dragon.attack = dragon.attack + cumAtk;
            let allObjects;
            (0, objects_1.getAllObjects)().then((data2) => {
                allObjects = data2;
                res.render("detail", { dragon: dragon, objects: allObjects });
            });
        }));
    }
    else {
        res.redirect("/");
    }
});
router.route('/addDragon/:id')
    .get((req, res) => {
    if (req.session && req.session.loggedin == true) {
        res.render('addDragon');
    }
})
    .post((req, res) => {
    if (req.session && req.session.loggedin == true) {
        let name = req.body.name;
        (0, dragons_1.addDragon)(name, parseInt(req.params.id)).then((data) => {
            res.redirect(`/list/${req.params.id}`);
        });
    }
});
router.route('/fight_selection/:id/:rider')
    .get((req, res) => {
    if (req.session && req.session.loggedin == true) {
        (0, dragons_1.getById)(parseInt(req.params.id)).then((data) => {
            if (typeof data[0].objects == "string") {
                let obj = data[0].objects.split(",");
                data[0].objects = obj;
            }
            (0, dragons_1.getOpponents)(parseInt(req.params.rider)).then((data2) => {
                if (typeof data2[0].objects == "string") {
                    let obj = data2[0].objects.split(",");
                    data2[0].objects = obj;
                }
                res.render('fightSelection', { dragon: data[0], opponnents: data2 });
            });
        });
    }
});
router.route('/fight/:id/:opponent')
    .get((req, res) => {
    // getById(parseInt(req.params.id)).then(async(data:any) => {  
    let dragon = new DragonClass_1.Dragon(parseInt(req.params.id));
    dragon.fetch();
    (0, dragons_1.getById)(parseInt(req.params.opponent)).then((data) => __awaiter(void 0, void 0, void 0, function* () {
        let opponent = new DragonClass_1.Dragon(data[0].id);
        opponent.name = data[0].name;
        opponent.attack = data[0].attack;
        opponent.defense = data[0].defense;
        opponent.slip = data[0].slip;
        opponent.level = data[0].level;
        opponent.avatar = data[0].avatar;
        console.log(dragon);
        let fight = dragon.fight(opponent);
        res.render('fight', { dragon: dragon, opponent: opponent, fight: fight });
    }));
    // })  
});
module.exports = router;
