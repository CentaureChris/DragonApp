"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleDb = void 0;
const mysql2_1 = require("mysql2");
class SingleDb {
    constructor() {
        this.dbConn = (0, mysql2_1.createConnection)({
            host: "localhost",
            user: "root",
            password: "root",
            database: "dragoncombat"
        });
    }
    static getInstance() {
        if (SingleDb.connection === null) {
            SingleDb.connection = new SingleDb();
        }
        return SingleDb.connection;
    }
    query(sql, params) {
        return new Promise((res, err) => {
            this.dbConn.query(sql, params, (error, result) => {
                if (error) {
                    err(error);
                }
                else {
                    res(result);
                }
            });
        });
    }
}
exports.SingleDb = SingleDb;
SingleDb.connection = null;
