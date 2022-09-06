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
const path_1 = __importDefault(require("path"));
const DragonClass_1 = require("./class/DragonClass");
const ObjectsClass_1 = require("./class/ObjectsClass");
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
// app.get('/list/:id', (req: Request, res: Response) => {
//   if(req.session && req.session.loggedin == true && req.session !== null && req.session !== undefined){
//     let idUser = req.params.id
//     getAllDragons(idUser).then((data:Array<IDragons>) => { 
//       for(let d of data){
//         if(typeof d.objects == "string"){
//           let obj = d.objects.split(",")
//           d.objects = obj;
//         }
//       }
//       res.render( "list", {dragons: data,idUser: idUser, user:req.session.username} );
//     });
//   }else{
//     res.redirect( "/");
//   }
// })
app.get('/list/:id', (req, res) => {
    if (req.session && req.session.loggedin == true && req.session !== null && req.session !== undefined) {
        let idUser = req.params.id;
        let dragonsList = [];
        getAllDragons(idUser).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            for (let d of data) {
                if (typeof d.objects === 'string') {
                    d.objects = d.objects.split(',');
                }
                let dragon = new DragonClass_1.Dragon(d.name, d.level, d.attack, d.defense, d.slip, d.objects, d.id);
                dragon.setAvatar(d.avatar);
                dragon.setRider(d.rider);
                if (d.objects !== null) {
                    dragon.objects = [];
                    for (let obj of d.objects) {
                        yield (0, objects_1.getObjectById)(obj).then((data2) => {
                            let Obj = new ObjectsClass_1.Objects(data2[0].name, data2[0].type, data2[0].attack, data2[0].defense, data2[0].slip, data2[0].image);
                            dragon.addObject(Obj);
                        });
                    }
                    dragonsList.push(dragon);
                }
            }
            console.log(dragonsList[0]);
            if (req.session !== undefined && req.session !== null) {
                res.render("list", { dragons: dragonsList, idUser: idUser, user: req.session.username });
            }
        }));
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
// app.get ('/detail/:id', (req, res) => {
//   if(req.session && req.session.loggedin == true){
//     getById(req.params.id).then(async (data:Array<IDragons>) => {
//       if(typeof data[0].objects == "string"){
//         let obj = data[0].objects.split(",")
//         data[0].objects = obj;
//       }
//       let dragon = new Dragon(data[0].name,data[0].level,data[0].attack,data[0].defense,data[0].slip,data[0].objects,data[0].id)
//       dragon.setAvatar(data[0].avatar)
//       // dragon.setRider(data[0].rider)
//       if (data[0].objects !== null){
//         dragon.objects = []
//         if(data[0].objects)
//         for(let obj of data[0].objects){
//           await getObjectById(obj).then((data2:any) => {
//             let Obj = new Objects(data2[0].name,data2[0].type,data2[0].attack,data2[0].defense,data2[0].slip,data2[0].image)
//             dragon.addObject(Obj)
//           })
//         }
//       }
//     })
//   }
// })
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
