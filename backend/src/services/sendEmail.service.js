import appConfig from "../config/appConfig.js"
import transporter from "./email.service.js"
import nodemailer from "nodemailer";

const sendEmail = async(to,subject,html)=>{
    try {
        const info = await transporter.sendMail({
            from:`Sonar Bank ${appConfig.EMAIL}`,
            to,
            subject,
            html
        })
        console.log("Message sent: %s",info.messageId);
        console.log("Preview URL: %s",nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error("Error sending email: ",error)
        
    }
}

export default sendEmail;