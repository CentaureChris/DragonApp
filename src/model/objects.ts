import { SingleDb } from '../class/SingleDb'
let db = SingleDb.getInstance()

export function getAllObjects() {
    return new Promise((result, rej) => {
        db.query(`SELECT * FROM object `,[]).then((data:any) => {
            const retObj = data
            result(retObj)
        }).catch((err:Error) => {
            rej(err)
        })
    })
}

export function getObjectById(id:number|string){
    return new Promise((result,rej) => {
        db.query(`SELECT * FROM object WHERE object.id = ?`,[id]).then((data:any) => {
            const retObj = data
            result(retObj)
        }).catch((err:Error) => {
            rej(err)
        })
    })
}

export function boostDragonsStats(id:number,a:number,d:number,s:number){
    return new Promise((result,rej) => {
        db.query(`UPDATE dragon set attack = ${a},defense = ${d}, slip = ${s} WHERE id = ?`,[id]).then((data:any) => {
            const retObj = data
            result(retObj)
        }).catch((err:Error) => {
            rej(err)
        })
    })
}

export function addEquipment(dragon:number,object:number){
    return new Promise((result,rej) => {
        db.query(`INSERT INTO equipment (dragon_id, object_id)
            VALUES (?,?)`,[dragon,object]).then((data:any) => {
            const retObj = data
            result(retObj)
        }).catch((err:Error) => {
            rej(err)
        })
    })
}

export function clearEquipment(dragon:number){
    return new Promise((result,rej) => {
        db.query(`DELETE FROM equipment
        WHERE dragon_id = ?`,[dragon]).then((data:any) => {
            const retObj = data
            result(retObj)
        }).catch((err:Error) => {
            rej(err)
        })
    })
}

export function bagCount(id:number){
    return new Promise((result,rej) => {
        db.query(`SELECT COUNT(object_id) as count FROM equipment WHERE dragon_id = ?`,[id]).then((data:any) => {
            const retObj = data
            result(retObj)
        }).catch((err:Error) => {
            rej(err)
        })
    })
}