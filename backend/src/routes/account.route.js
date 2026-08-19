import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import accountController from "../controllers/account.controller.js";




const accountRoute = Router();


accountRoute.post("/",authMiddleware.authMiddleware,accountController.createAccount);



export default accountRoute;