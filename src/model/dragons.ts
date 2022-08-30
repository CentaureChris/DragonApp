const mysql = require("mysql2")
let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "dragoncombat"
})

export function getAllDragons() {
    return new Promise((result, rej) => {
        conn.query("SELECT * FROM dragon", (err: any, res: any) => {
            if (err) rej(err)
            else result(res)
        })
    })
}