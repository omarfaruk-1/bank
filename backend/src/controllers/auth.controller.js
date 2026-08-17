import appConfig from "../config/appConfig.js";
import userModel from "../models/user.model.js";
import jwt  from "jsonwebtoken";
import sendEmail from "../services/sendEmail.service.js";
import registerTemplate from "../templates/register.template.js";

async function userRegister(req,res){
    try {
        const {name,email,password}=req.body;
        const isExists = await userModel.findOne({email:email});
        if(isExists) return res.status(422).json({
            message: "User already exist with this email",
            status:"failed"
        })
        const user= await userModel.create({
            name, email, password
        });
        const token = jwt.sign({userId:user._id},appConfig.JWT_SECRET,{expiresIn:"2h"});
        res.cookie("token",token); 

        res.status(201).json({
            message: "User register successfully",
            "user":{
                userId:user._id,
                username:user.name,
                email:user.email
            }
        })
        await sendEmail(user.email,"Welcome to Sonar Bank",registerTemplate(user.name));

    } catch (error) {
        console.log(error)
    }
}

async function loginUser(req,res){
    try {
        const {email,password}=req.body;
        const user = await userModel.findOne({email}).select("+password");
        if(!user) return res.status(401).json({
            message:"Email or password invalid"
        })
        const isValidPassword= await user.comparePassword(password);
        if(!isValidPassword) return res.status(401).json({
            message:"Email or password invalid"
        })

        const token = jwt.sign({userId:user._id},appConfig.JWT_SECRET,{expiresIn:"2h"});
        res.cookie("token",token); 

        res.status(200).json({
            message:"User login successfully",
            user:{
                userId:user._id,
                username:user.name,
                email:user.email
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export default {userRegister,loginUser}