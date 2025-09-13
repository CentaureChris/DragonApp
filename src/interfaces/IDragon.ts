import { Objects } from "../class/ObjectsClass"

export interface IDragons {
    id?: number;
    name: string;
    avatar: string | undefined ;
    level:number;
    attack: number;
    defense: number;
    slip: number;
    objects: (Objects | string)[];
    rider: number|string|undefined;
}