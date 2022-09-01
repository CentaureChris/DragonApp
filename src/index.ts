import express, { Express, Request, Response } from 'express';
import path from "path";
import { IDragons } from "./interfaces/IDragon"
import { IObjects } from './interfaces/IObject';
import { addUser,getUsers } from './model/users';
import { getAllObjects } from './model/objects';

const { getAllDragons,getById,addDragon,getOpponents } = require("./model/dragons")

var cookieSession = require("cookie-session")

// const dotenv = require('dotenv');
// dotenv.config();

const app: Express = express();
const port = 3000;

app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );
app.use(express.json());
app.use(express.static(__dirname+'/assets'));
app.use(express.urlencoded({ extended: false }))
app.use(cookieSession({
  username: 'session',
  loggedin: false,
  keys: ['key1', 'key2'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.get("/",(req: Request, res: Response) => {
  let errMsg = ""
  res.render('login',{info : errMsg})
})

app.post('/auth', (req:Request, res:Response) => {
	let username = req.body.login;
	let password = req.body.password;
	if (username && password) {
		getUsers(username,password).then((data:any)=> {
      if(data.length > 0) {
        let idUser = data[0].id
        if(req.session){
          req.session.username = username;
          req.session.loggedin = true;
				  res.redirect(`/list/${idUser}`);
        }
			} else {
        let errMsg = "Incorrect Username/Password!"
        res.render('login',{info : errMsg})
			}			
		});
	} else {
    let errMsg = "Please enter Username and Password!"
    res.render('login',{info : errMsg})
		res.end();
	}
});

app.get("/register",(req: Request, res: Response) => {
  res.render('register')
})

app.post('/register', (req:Request,res:Response) => {
  let username = req.body.login;
	let password = req.body.password;
  if (username && password) {
		addUser(username,password).then((data:any)=> {
			res.redirect('/');		
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

app.get("/logout",(req: Request, res: Response) => {
  if(req.session){
    req.session.username = "";
    req.session.loggedin = false;
    res.redirect('/')
  }
})

app.get('/list/:id', (req: Request, res: Response) => {
  if(req.session && req.session.loggedin == true && req.session !== null && req.session !== undefined){
    let idUser = req.params.id
    getAllDragons(idUser).then((data:Array<IDragons>) => { 
      for(let d of data){
        if(typeof d.objects == "string"){
          let obj = d.objects.split(",")
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
      res.render( "list", {dragons: data,idUser: idUser, user:req.session.username} );
    });
  }else{
    res.redirect( "/");
  }
})

app.get("/detail/:id", (req, res) => {
  if(req.session && req.session.loggedin == true){
    getById(req.params.id).then((data:Array<IDragons>) => {  
      if(typeof data[0].objects == "string"){
        let obj = data[0].objects.split(",")
        data[0].objects = obj;
      }
      getAllObjects().then((data2:any) => {
        res.render( "detail", {dragon: data[0],objects: data2} );
      })
    });
  }else{
    res.redirect( "/");
  }
})

app.get('/addDragon/:id', (req,res) => {
  if(req.session && req.session.loggedin == true){
    res.render('addDragon')
  }
})

app.post('/addDragon/:id', (req,res) => {
  if(req.session && req.session.loggedin == true){
    let name = req.body.name
    addDragon(name,req.params.id).then((data:any) => {
      res.redirect(`/list/${req.params.id}`)
    })
  }
})

app.get('/fight_selection/:id/:rider', (req:Request,res:Response) => {
  if(req.session && req.session.loggedin == true){
    getById(req.params.id).then((data:Array<IDragons>) => {  
      if(typeof data[0].objects == "string"){
        let obj = data[0].objects.split(",")
        data[0].objects = obj;
      }
        getOpponents(req.params.rider).then((data2:Array<IDragons>) => {  
          if(typeof data2[0].objects == "string"){
            let obj = data2[0].objects.split(",")
            data2[0].objects = obj;
          }
          console.log(data2)
          res.render('fightSelection', {dragon: data[0],opponnents:data2} )
        });
    });
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});


