import { IObjects } from "../interfaces/IObject";
import { Dragon } from "../class/DragonClass";
import { boostDragonsStats, Model } from "../model/objects"

export class Objects implements IObjects {

    name: string;
    type: string;
    attack: number;
    defense: number;
    slip: number;
    dragon_id!:number;
    image:string;

    public constructor(n:string,t:string,a:number,d:number,s:number,i:string){
        this.name = n
        this.type = t
        this.attack = a
        this.defense = d
        this.slip = s
        // this.dragon_id = did
        this.image = i
    }

    public setDragonid(id:number){
        this.dragon_id = id
    }

    public boost(a:number,d:number,s:number){
        boostDragonsStats(this.dragon_id,a,d,s).then((data:any) => {
            console.log(data);
        })
    }

}