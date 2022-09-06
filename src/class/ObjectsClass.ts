import { IObjects } from "../interfaces/IObject";

export class Objects implements IObjects {

    name: string;
    type: string;
    attack: number;
    defense: number;
    slip: number;
    // dragon_id:number|undefined;
    image:string;

    public constructor(n:string,t:string,a:number,d:number,s:number,i:string){
        this.name = n
        this.type = t
        this.attack = a
        this.defense = d
        this.slip = s
        // this.dragon_id =did
        this.image = i
    }



}