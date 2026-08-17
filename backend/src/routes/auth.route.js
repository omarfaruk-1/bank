import { Router } from "express";
import authController from "../controllers/auth.controller.js";


const authRouter = Router();

//api/users/register
authRouter.post("/register",authController.userRegister);
authRouter.post("/login",authController.loginUser);







export default authRouter;