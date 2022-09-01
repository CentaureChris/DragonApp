const mysql = require("mysql2")
let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "dragoncombat"
})

export function getAllObjects() {
    return new Promise((result, rej) => {
        conn.query(`SELECT * FROM object `, (err: any, res: any) => {
            if (err) rej(err)
            else result(res)
        })
    })
}