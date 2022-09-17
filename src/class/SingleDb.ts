import { createConnection, Connection } from "mysql2"

export class SingleDb {
    private static connection: SingleDb | null = null
    private dbConn: Connection
    private constructor() {
        this.dbConn = createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "dragoncombat"
        })
    }

    static getInstance() {
        if (SingleDb.connection === null) {
            SingleDb.connection = new SingleDb()
        }
        return SingleDb.connection
    }

    query(sql: string, params: any[]) {
        return new Promise((res, err) => {
            this.dbConn.query(sql, params, (error: any, result: any) => {
                if (error) {
                    err(error)
                }
                else {
                    res(result)
                }
            })
        })
    }
}