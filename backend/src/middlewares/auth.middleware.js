import appConfig from "../config/appConfig.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

async function authMiddleware(req,res,next){
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if(!token) return res.status(401).json({
            message: "Unauthorized token"
        });
        const decode = jwt.verify(token,appConfig.JWT_SECRET);
        const user = await userModel.findById(decode.userId);
        if(!user) return res.status(404).json({
            message: "User not authorized to access this content"
        })
        req.user=user;
        next();

    } catch (error) {
        return res.status(401).json({message: "Unauthorized access, token is invalid"})
    }
}

export default {authMiddleware};