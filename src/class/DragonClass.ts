import { IDragons } from "../interfaces/IDragon";
import { IObjects } from "../interfaces/IObject";
import { Objects } from "../class/ObjectsClass";
const { getAllDragons,getById,addDragon,getOpponents } = require("../model/dragons")

export class Dragon implements IDragons{
    id?: number | undefined;
    name:string;
    avatar: string | undefined ;
    level:number;
    attack: number;
    defense: number;
    slip: number;
    objects: Array<Objects>|Array<string>|undefined;
    rider: number|string|undefined;

    public constructor(
        n:string,
        l:number,
        at:number,
        d:number,
        s:number,
        o:Array<Objects>|Array<string>|undefined,
        id?:number | undefined,
        ){
            
        this.name = n
        this.level = l
        this.attack = at
        this.defense = d
        this.slip = s
        this.objects = o
        this.id = id
    }

    public setRider(rider:number|string) {
        this.rider = rider
    }

    public setAvatar(avatar:string|undefined) {
        this.avatar = avatar
    }

    public addObject(object:Objects | string){
        this.objects?.push(object)
    }

}  