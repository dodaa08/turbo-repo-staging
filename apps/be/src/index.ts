import "dotenv/config";
import express from "express";
const app = express();
import cors from "cors";

import { pgClient } from "@repo/prisma/client";


const port = process.env.PORT || 8080;

app.use(express.json());

app.use(cors({    
    origin : "*",
    methods : ["GET", "POST"]
}));

app.get("/", (req, res)=>{
    res.send("Default server working...");
});

app.post("/signup", async (req, res)=>{
    const {email, password} = req.body;
    try{
        const resp = await pgClient.user.create({
            data : {
                email : email,
                password : password
            }
        });

        if(resp){
            console.log("User created..");
            res.status(200).json({
                message : "User created",
                user : resp
            });
        }
    }
    catch(error){
        console.error("error creating user", error);
        res.send(`error creating user ${error}`);
    }
});


app.get("/user", async (req, res)=>{
    const {email} = req.query;
    if (!email || typeof email !== 'string') {
       return res.status(400).json({ message: "Email parameter is required" });
   }
    try{
        
        const resp = await pgClient.user.findFirst({ where: { email } });
        if(resp){
            console.log("user found", resp);
            res.send(resp)
        }
        else {
       res.status(404).json({ message: "User not found" });
   }
    }
    catch(error){
           console.error("error finding user", error);
   res.send(`error finding user ${error}`);
    }
});


app.listen(port, ()=>{
    console.log("Server running on", port); 
});