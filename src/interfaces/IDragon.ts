import { IObjects } from "./IObject"

export interface IDragons {
    id?: number;
    name: string;
    level:number;
    attack: number;
    defense: number;
    slip: number;
    objects: Array<string>|string;
}