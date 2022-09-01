"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const users_1 = require("./model/users");
const objects_1 = require("./model/objects");
const { getAllDragons, getById, addDragon, getOpponents } = require("./model/dragons");
var cookieSession = require("cookie-session");
// const dotenv = require('dotenv');
// dotenv.config();
const app = (0, express_1.default)();
const port = 3000;
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express_1.default.json());
app.use(express_1.default.static(__dirname + '/assets'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieSession({
    username: 'session',
    loggedin: false,
    keys: ['key1', 'key2'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.get("/", (req, res) => {
    let errMsg = "";
    res.render('login', { info: errMsg });
});
app.post('/auth', (req, res) => {
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
app.get("/register", (req, res) => {
    res.render('register');
});
app.post('/register', (req, res) => {
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
app.get("/logout", (req, res) => {
    if (req.session) {
        req.session.username = "";
        req.session.loggedin = false;
        res.redirect('/');
    }
});
app.get('/list/:id', (req, res) => {
    if (req.session && req.session.loggedin == true && req.session !== null && req.session !== undefined) {
        let idUser = req.params.id;
        getAllDragons(idUser).then((data) => {
            for (let d of data) {
                if (typeof d.objects == "string") {
                    let obj = d.objects.split(",");
                    d.objects = obj;
                }
            }
            // let myProm = []@
            // for(let d of data){
            //   d.objects = []
            //   myProm.push(getDragonsEquipment(d.id))
            //   // .then(( data2:Array<IObjects>) => {
            //   //   data[d].objects = data2
            //   //   console.log(data[0].objects)
            //   // })
            // }Promise.all(myProm).then((data2:Array<Array<IObjects>>) => {
            //   for(let d of data){
            //     for(let tabObjects of data2){
            //       for(let object of tabObjects){
            //         if(d.id == object.dragon_id){
            //           d.objects.push(object)
            //         }
            //       }
            //     }
            //   }
            // })
            res.render("list", { dragons: data, idUser: idUser, user: req.session.username });
        });
    }
    else {
        res.redirect("/");
    }
});
app.get("/detail/:id", (req, res) => {
    if (req.session && req.session.loggedin == true) {
        getById(req.params.id).then((data) => {
            if (typeof data[0].objects == "string") {
                let obj = data[0].objects.split(",");
                data[0].objects = obj;
            }
            (0, objects_1.getAllObjects)().then((data2) => {
                res.render("detail", { dragon: data[0], objects: data2 });
            });
        });
    }
    else {
        res.redirect("/");
    }
});
app.get('/addDragon/:id', (req, res) => {
    if (req.session && req.session.loggedin == true) {
        res.render('addDragon');
    }
});
app.post('/addDragon/:id', (req, res) => {
    if (req.session && req.session.loggedin == true) {
        let name = req.body.name;
        addDragon(name, req.params.id).then((data) => {
            res.redirect(`/list/${req.params.id}`);
        });
    }
});
app.get('/fight_selection/:id/:rider', (req, res) => {
    if (req.session && req.session.loggedin == true) {
        getById(req.params.id).then((data) => {
            if (typeof data[0].objects == "string") {
                let obj = data[0].objects.split(",");
                data[0].objects = obj;
            }
            getOpponents(req.params.rider).then((data2) => {
                if (typeof data2[0].objects == "string") {
                    let obj = data2[0].objects.split(",");
                    data2[0].objects = obj;
                }
                console.log(data2);
                res.render('fightSelection', { dragon: data[0], opponnents: data2 });
            });
        });
    }
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
