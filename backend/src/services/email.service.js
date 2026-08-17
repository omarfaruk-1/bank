import nodemailer from "nodemailer";
import appConfig from "../config/appConfig.js";

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        type:"OAuth2",
        user:appConfig.EMAIL,
        clientId:appConfig.CLIENT_ID,
        clientSecret:appConfig.CLIENT_SECRET,
        refreshToken:appConfig.GOOGLE_REFRESH_TOKEN
    }
})

transporter.verify((error,success)=>{
    if(error){
        console.error("Error connecting to mail server: ",error)
    }else{
        console.log("Email server is ready to send message")
    }
})

export default transporter;
