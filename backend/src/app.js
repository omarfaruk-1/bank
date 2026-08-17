import cookieParser from "cookie-parser";
import express from "express";
import authRouter from "./routes/auth.route.js";

const app=express();
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/users",authRouter)


export default app;