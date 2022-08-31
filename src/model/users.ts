const mysql = require("mysql2")
let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "dragoncombat"
})

export function getUsers(login:string,pass:string){
    return new Promise ((result,rej) => {
        conn.query('SELECT * FROM user WHERE login = ? AND password = ?', [login, pass], function(error:any, res:any) {
			if (error){
                throw error;
            } else{
                result(res)
            }
        })
    })
}

export function addUser(login:string,pass:string){
    return new Promise ((result,reg) => {
        conn.query('INSERT INTO `user` (`id`, `login`, `password`) VALUES (NULL, ?, ?);',[login,pass], (error:any, res:any) => {
			if (error){
                throw error;
            } else{
                result(res)
            }
        })
    })
}