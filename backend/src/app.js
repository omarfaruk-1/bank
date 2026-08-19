import cookieParser from "cookie-parser";
import express from "express";
import authRouter from "./routes/auth.route.js";
import accountRoute from "./routes/account.route.js";

const app=express();
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/users",authRouter)
//account route
app.use("api/account",accountRoute)


export default app;