import { SingleDb } from '../class/SingleDb'

let db = SingleDb.getInstance()

export async function getAllDragons(idUser:number) {
    return new Promise((result, rej) => {
        db.query(`SELECT d.id,d.name,d.level,d.attack,d.defense,d.slip,d.rider,a.image as avatar, GROUP_CONCAT(obj.id) AS objects FROM dragon AS d LEFT JOIN equipment as eq ON d.id = eq.dragon_id LEFT JOIN object as obj ON eq.object_id = obj.id LEFT JOIN avatar as a ON a.id = d.avatar WHERE d.rider = ? GROUP BY d.id `, [idUser]).then((data:any) => {
            const retObj = data
            result(retObj)
        }).catch((err:Error) => {
            rej(err)
        })
    })
}

export function getById(id:number) {
    return new Promise((result, rej) => {
        db.query(`SELECT d.id,d.name,d.level,d.attack,d.defense,d.slip,d.rider,a.image as avatar, GROUP_CONCAT(obj.id) AS objects FROM dragon AS d LEFT JOIN equipment as eq ON d.id = eq.dragon_id LEFT JOIN object as obj ON eq.object_id = obj.id LEFT JOIN avatar as a ON a.id = d.avatar WHERE d.id = ? GROUP BY d.id `,[id]).then((data:any) => {
            const retObj = data
            result(retObj)
        }).catch((err:Error) => {
            rej(err)
        })
    })
}

export function addDragon(name:string,rider:number) {
    return new Promise((result, rej) => {
        db.query(`INSERT INTO dragon (id, name, level, attack, defense, slip,rider,avatar) VALUES (NULL, ?, 1, 3, 2, 1,?,1);`, [name,rider]).then((data:any) => {
            const retObj = data
            result(retObj)
        }).catch((err:Error) => {
            rej(err)
        })
    })
}

export function getOpponents(id:number) {
    return new Promise((result, rej) => {
        db.query(`SELECT d.id,d.name,d.level,d.attack,d.defense,d.slip,d.rider,a.image as avatar, GROUP_CONCAT(obj.name) AS objects FROM dragon AS d LEFT JOIN equipment as eq ON d.id = eq.dragon_id LEFT JOIN object as obj ON eq.object_id = obj.id LEFT JOIN avatar as a ON a.id = d.avatar WHERE d.rider != ? GROUP BY d.id `,[id]).then((data:any) => {
            const retObj = data
            result(retObj)
        }).catch((err:Error) => {
            rej(err)
        })
    })
}