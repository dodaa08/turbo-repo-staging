import "dotenv/config";
import express from "express";
const app = express();
const port = 8000;
import { pgClient } from "@repo/prisma/client";

app.use(express.json());

app.post("/signup", async (req, res)=>{
    const {email, password} = req.body;
    try{
        const response = await pgClient.user.create({
            data : {
                email : email,
                password : password
            }
        });

        res.json({
            message : "user created",
            user : response
        })
    }
    catch(error){
        console.log("error", error);
    }
});


app.get("/", (req, res)=>{
    console.log("default route..");
    res.send("Hello World");
    // res.json({ message: "HTTP API is running" });
});

app.listen(port, '0.0.0.0', ()=>{
    console.log("Listening on ", port);
})