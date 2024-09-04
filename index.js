const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretKey = "secretKey";

app.get("/",(req,res)=>{
    res.send("hello")
})

app.post("/login",(req,res)=>{
    const user={
        id : 1,
        username: "faizan",
        password : "faizan@gmail.com"
    }
    jwt.sign({ user}, secretKey, {expiresIn:"300s"},(err,token)=>{
        res.json({
            token
        })
    })
})

app.post("/profile",verifyToken,(req,res)=>{
    jwt.verify(req.token,secretKey,(err,authData)=>{
        if (err){
            res.send('aaaa')
        }else{
            res.json({
                message:'done',
                authData
            })
        }
    })
   
})

function verifyToken(req,res,next){
    const bearerHeader = req.headers['token'];
    if (typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token= bearer[1];
        req.token= token;
        next();
    }else{
        res.send({
            result:'Token is not valid'
        })
    }
}

app.listen(8000,()=>{
    console.log("faiaashaudxhsu")
})