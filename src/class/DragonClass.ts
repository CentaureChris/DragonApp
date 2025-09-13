import { IDragons } from "../interfaces/IDragon";
import { Objects } from "../class/ObjectsClass";
import { getAllDragons,getById,addDragon,getOpponents } from "../model/dragons"
import { getObjectById } from "../model/objects"

export class Dragon implements IDragons{
    id: number;
    name:string;
    avatar: string | undefined ;
    level!:number;
    attack!: number;
    defense!: number;
    slip!: number;
    objects!: (Objects | string)[];
    rider!: number|string|undefined;
    lifePoint!: number

    public constructor(id:number){
        this.id = id
        this.name = ''
        this.level = 1
        this.attack = 3
        this.defense = 2
        this.slip = 1
        // this.objects = undefined
        this.lifePoint = 100
        // this.id = 
    }

    public addObject(object:Objects | string){
        this.objects?.push(object)
    }

    public fight(opponent:Dragon){
        let result = ""
        let turn = 1
        while(this.lifePoint > 0 && opponent.lifePoint > 0){
            if(turn % 2 == 0){
                result += `${this.name} attack ${opponent.name}!...`
                let slip = false
                for(let i=0;i <= opponent.slip;i++){
                    let dice = Math.round(Math.random() * (6 - 1) + 1)
                    if(dice == 6){
                        slip = true
                        break
                    }
                }
                if(slip == true){
                    result += `${opponent.name} dodged the attack!...\n`
                }else{
                    opponent.lifePoint -= this.attack>opponent.defense?(this.attack - opponent.defense):(opponent.defense-this.attack)/2
                    result += `${this.name} hit ${opponent.name} `
                }
                turn++
            }else{
                result += `${opponent.name} attack ${this.name}!...\n`
                let slip = false
                for(let i=0;i <= this.slip;i++){
                    let dice = Math.round(Math.random() * (6 - 1) + 1)
                    if(dice == 6){
                        slip = true
                        break
                    }
                }
                if(slip == true){
                    result += `${this.name} dodged the attack!...\n`
                }else{
                    this.lifePoint -= opponent.attack>this.defense?(opponent.attack - this.defense):(this.defense-opponent.attack)/2
                    result += `${opponent.name} hit ${this.name} `
                }
                turn++
            }
            if(this.lifePoint <= 0){
                result += `${opponent.name} WIN ${this.lifePoint} / ${opponent.lifePoint}`
            }else if(opponent.lifePoint <= 0){
                result += `${this.name} WIN ${this.lifePoint} / ${opponent.lifePoint}`
            }
        }
        return result
    }

    public fetch(){
        getById(this.id).then(async (data:any) => {
            this.name = data[0].name
            this.attack = data[0].attack
            this.defense = data[0].defense
            this.slip = data[0].slip
            this.level = data[0].level
            this.rider = data[0].rider
            this.avatar = data[0].avatar
            if(data[0].objects != null){
                let dataObj = data[0].objects.split(',')
                for (let obj of dataObj){
                    if(typeof obj == 'number'){
                        await getObjectById(obj).then((data2:any) => {
                            let object =  new Objects(data2[0].name,data2[0].type,data2[0].attack,data2[0].defense,data2[0].slip,data2[0].image)
                            console.log(object)
                        })
                    }
                }
            }else{
                let dataObj = data[0].objects
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
        })
    }
}  