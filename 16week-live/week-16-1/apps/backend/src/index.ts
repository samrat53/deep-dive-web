import express from "express";
const app=express();
import {BACKEND_URL} from "@repo/common/config"
console.log(BACKEND_URL);
// to log into the console i.e to resolve inputs from a differerent library , use esbuild or tsup, npx esbuild ./src/index.ts --bundle --platform=node --outfile=dist/index.js

app.get("/",(req,res)=>{
    res.json({
        message:"hi from backend"
    })
})

app.listen(3002);