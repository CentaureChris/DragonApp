import express, { Express, Request, Response } from 'express';
import path from "path";
import { IDragons } from "./interfaces/IDragon"
const { getAllDragons } = require("./model/dragons")

// const dotenv = require('dotenv');
// dotenv.config();

const app: Express = express();
const port = 3000;

app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

app.get('/', (req: Request, res: Response) => {
  getAllDragons().then((data:Array<IDragons>) => {  
    res.render( "index", {dragons: data} );
  });
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});


