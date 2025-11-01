import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;



app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended : true}));

//create user defined middlewear

function myfunc(req,res,next){
    console.log("request method : " + req.method);
    console.log("request url : "+req.url);
    next();
}

app.use(myfunc);

app.post("/submit",(req,res)=>{
   console.log(req.body);
   
   const name = req.body.name;
   const email = req.body.email;
   res.send(`<h3>Form submitted</h3><p>name : ${name}</p><p>email : ${email}</p>`);
   
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});


app.listen(port,()=>{
    console.log("port is 3000");
});

