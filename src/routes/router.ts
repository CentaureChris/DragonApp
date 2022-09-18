import express, { Express, Request, Response } from 'express';
import { Dragon } from "../class/DragonClass"
import { Objects } from "../class/ObjectsClass"
import { addUser,getUsers } from '../model/users';
import { getAllObjects, getObjectById,addEquipment, bagCount, clearEquipment } from '../model/objects';
import { getAllDragons,getById,addDragon,getOpponents } from '../model/dragons';

const app: Express = express();
let router = express.Router();

router.route('/')
.get((req: Request, res: Response) => {
    let errMsg = ""
    res.render('login',{info : errMsg})
})

router.route("/auth")
.post ((req:Request, res:Response) => {
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
        res.render('login',{info : errMsg,session:req.session})
			}			
		});
	} else {
    let errMsg = "Please enter Username and Password!"
    res.render('login',{info : errMsg})
		res.end();
	}
});

router.route('/register')
.get((req: Request, res: Response) => {
  res.render('register')
})
.post((req:Request,res:Response) => {
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
})

router.route('/logout')
.get((req: Request, res: Response) => {
  if(req.session){
    req.session.username = "";
    req.session.loggedin = false;
    res.redirect('/')
  }
})

router.route('/list/:id')
.get((req: Request, res: Response) => {
  if(req.session && req.session.loggedin == true && req.session !== null && req.session !== undefined){
    let idUser = parseInt(req.params.id)
    let dragonsList:Array<Dragon>= []
     getAllDragons(idUser).then(async (data:any) => { 
      for(let d of data){
        if(typeof d.objects === 'string' ){
          d.objects = d.objects.split(',')
        }
        let dragon = new Dragon(d.id)

        dragon.name = d.name
        dragon.addObject(d.objects)
        dragon.attack = d.attack
        dragon.defense = d.defense
        dragon.slip = d.slip
        dragon.level = d.level
        dragon.avatar = d.avatar
        dragon.rider = d.rider
        if (d.objects !== null){
          dragon.objects = []
          for(let obj of d.objects){
            await getObjectById(obj).then((data2:any) => {
              let Obj = new Objects(data2[0].name,data2[0].type,data2[0].attack,data2[0].defense,data2[0].slip,data2[0].image)
              dragon.addObject(Obj)
            })
          }
        }
        dragonsList.push(dragon)
      }
      // console.log(dragonsList)
      if(req.session !== undefined && req.session !== null){
        res.render( "list", {dragons: dragonsList,idUser: idUser, user:req.session.username} );
      }
    })

  }
})

router.route('/detail/:id/:object')
.get((req:Request,res:Response) => {
  let idObj = parseInt(req.params.object)
  let idDrag = parseInt(req.params.id)
  let dragon = new Dragon(idDrag)
  bagCount(idDrag).then((data:any) => {
   let bagCount = data[0].count
   if(bagCount < 3){
    addEquipment(idDrag,idObj).then((data:any) => { 
        res.redirect(`/detail/${idDrag}`);		
      }) 
    }
  }) 
})

router.route('/clearbag/:id')
.get((req:Request,res:Response) => {
  let idDrag = parseInt(req.params.id)
  clearEquipment(idDrag).then((data:any) => {
    res.redirect(`/detail/${idDrag}`);		
  })
})

router.route("/detail/:id")
.get((req, res) => {
  if(req.session && req.session.loggedin == true){
    getById(parseInt(req.params.id)).then(async(data:any) => {  
      if(typeof data[0].objects == "string"){
        data[0].objects = data[0].objects.split(',')
      }
      let dragon = new Dragon(data[0].id)
      dragon.fetch()
      console.log(dragon)
      if(data[0].rider)
      dragon.rider = data[0].rider
      dragon.objects = []
      let cumAtk:number = 0
      let cumDef:number = 0
      let cumSlip:number = 0
      if(data[0].objects)
      for(let obj of data[0].objects){
        await getObjectById(obj).then((data2:any) => {
          let Obj = new Objects(data2[0].name,data2[0].type,data2[0].attack,data2[0].defense,data2[0].slip,data2[0].image)
          cumAtk += Obj.attack
          cumDef += Obj.defense
          cumSlip += Obj.slip
          dragon.addObject(Obj)
          if(dragon.id){
            Obj.setDragonid(dragon.id)
          }
        })
      }
      dragon.attack = dragon.attack+cumAtk
      dragon.defense += cumAtk
      dragon.slip += cumSlip
      let allObjects:Objects
      getAllObjects().then((data2:any) => {
        allObjects = data2 
        res.render( "detail", {dragon: dragon,objects: allObjects } );
      })
    });
  }else{
    res.redirect( "/");
  }
})

router.route('/fight_selection/:id/:rider')
.get((req:Request,res:Response) => {
  if(req.session && req.session.loggedin == true){
    getById(parseInt(req.params.id)).then(async(data:any) => {  
      if(typeof data[0].objects == "string"){
        data[0].objects = data[0].objects.split(",")
      }let dragon = new Dragon(data[0].name)
      dragon.id = data[0].id
      dragon.attack = data[0].attack
      dragon.defense = data[0].defense
      dragon.slip = data[0].slip
      dragon.level = data[0].level
      dragon.avatar = data[0].avatar

      if(data[0].rider)
      dragon.rider = data[0].rider
      dragon.objects = []
      let cumAtk:number = 0
      let cumDef:number = 0
      let cumSlip:number = 0
      if(data[0].objects)
      for(let obj of data[0].objects){
        await getObjectById(obj).then((data2:any) => {
          let Obj = new Objects(data2[0].name,data2[0].type,data2[0].attack,data2[0].defense,data2[0].slip,data2[0].image)
          cumAtk += Obj.attack
          cumDef += Obj.defense
          cumSlip += Obj.slip
          dragon.addObject(Obj)
          if(dragon.id){
            Obj.setDragonid(dragon.id)
          }
        })
      }
      dragon.attack+=cumAtk
      dragon.defense += cumAtk
      dragon.slip += cumSlip
      getOpponents(parseInt(req.params.rider)).then((data2:any) => {  
        if(typeof data2[0].objects == "string"){
          let obj = data2[0].objects.split(",")
          data2[0].objects = obj;
        }
        res.render('fightSelection', {dragon: dragon,opponnents:data2} )
        console.log(dragon)
      });
    });
  }
})

router.route('/fight/:id/:opponent')
.get((req:Request,res:Response) => {
    // getById(parseInt(req.params.id)).then(async(data:any) => {  
    let dragon = new Dragon(parseInt(req.params.id))
    dragon.fetch()
     getById(parseInt(req.params.opponent)).then(async(data:any) => {  
      let opponent = new Dragon(data[0].id)
      opponent.name = data[0].name
      opponent.attack = data[0].attack
      opponent.defense = data[0].defense
      opponent.slip = data[0].slip
      opponent.level = data[0].level
      opponent.avatar = data[0].avatar
      console.log(dragon)
      let fight = dragon.fight(opponent)
      res.render('fight', {dragon:dragon,opponent:opponent,fight:fight} )
    })
  // })  
})

router.route('/addDragon/:id')
.get((req,res) => {
  if(req.session && req.session.loggedin == true){
    res.render('addDragon')
  }
})
.post((req,res) => {
  if(req.session && req.session.loggedin == true){
    let name = req.body.name
    addDragon(name,parseInt(req.params.id)).then((data:any) => {
      res.redirect(`/list/${req.params.id}`)
    })
  }
})

module.exports = router