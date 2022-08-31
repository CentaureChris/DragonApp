const mysql = require("mysql2")
let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "dragoncombat"
})

export function getAllDragons() {
    return new Promise((result, rej) => {
        conn.query("SELECT d.id,d.name,d.level,d.attack,d.defense,d.slip, GROUP_CONCAT(obj.name) AS objects FROM dragon AS d LEFT JOIN equipment as eq ON d.id = eq.dragon_id LEFT JOIN object as obj ON eq.object_id = obj.id GROUP BY d.id", (err: any, res: any) => {
            if (err) rej(err)
            else result(res)
        })
    })
}

export function getById(id:number) {
    return new Promise((result, rej) => {
        conn.query(`SELECT d.id,d.name,d.level,d.attack,d.defense,d.slip, GROUP_CONCAT(obj.name) AS objects FROM dragon AS d LEFT JOIN equipment as eq ON d.id = eq.dragon_id LEFT JOIN object as obj ON eq.object_id = obj.id WHERE d.id = ${id} GROUP BY d.id`, (err: any, res: any) => {
            if (err) rej(err)
            else result(res)
        })
    })
}

export function addDragon(name:string) {
    return new Promise((result, rej) => {
        conn.query(`INSERT INTO dragon (id, name, level, attack, defense, slip) VALUES (NULL, ?, 1, 3, 2, 1);`, [name], (err: any, res: any) => {
            if (err) rej(err)
            else result(res)
        })
    })
}


