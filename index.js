import express from 'express';
import Connection from './Database/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import Router from './Routes/router.js'
import bodyParser from 'body-parser';
import path from 'path';

const __dirname = path.resolve();
dotenv.config();
const app = express();
app.use(bodyParser.json({extended:true}))
app.use(cors({ origin: true, credentials: true }));
app.use('/',Router);


app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function(_,res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"), function(err){
        res.status(500).send(err);
    })
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Server is listening on port 5000")
})
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@mern-projects.a1khghl.mongodb.net/?retryWrites=true&w=majority`
Connection(URL);