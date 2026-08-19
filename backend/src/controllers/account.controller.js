import accountModel from "../models/account.model.js";



async function createAccount(req,res){
    try {
        const user=req.user;
        const account = await accountModel.create({
            user:user._id,
        })
        res.status(201).json({
            message:"Account create successfully",
            account
        })
    } catch (error) {
        return res.status().json({message:"Account create filed ",error})
    }
}


export default {createAccount}