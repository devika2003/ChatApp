import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js"
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser";
import chatRoutes from "./routes/chat.route.js"
import { protectRoute } from "./middleware/auth.middleware.js";
import cors from "cors"
import path from "path"
dotenv.config();
connectDB();
const app=express();
const PORT =process.env.PORT
const __dirname=path.resolve();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/chat",protectRoute,chatRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

// app.get("/",(req,res)=>{
//     res.send("hello");})

app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))