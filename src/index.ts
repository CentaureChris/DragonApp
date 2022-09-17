import express, { Express, Request, Response } from 'express';
import path from "path";
const routes = require('./routes/router')


const { getAllDragons,getById,addDragon,getOpponents } = require("./model/dragons")

var cookieSession = require("cookie-session")

// const dotenv = require('dotenv');
// dotenv.config();

const app: Express = express();
const port = 3000;

app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );
app.use(express.json());
app.use(express.static(__dirname+'/assets'));
app.use(express.urlencoded({ extended: false }))
app.use(cookieSession({
  username: 'session',
  loggedin: false,
  keys: ['key1', 'key2'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use("/",routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});


