import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    fromAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"account",
        required: [true,"Transaction must be associated with form account"],
        index:true,
    },
    toAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"account",
        required: [true,"Transaction must be associated with to account"],
        index:true,
    },
    status:{
        type:String,
        enum:["pending","complete","failed","reversed"],
        message:"status can be either pending,complete,failed or reversed",
        default : "pending"
    },
    amount:{
        type:Number,
        required: [true,"Amount is required for creating a transaction"],
        min:[0,"Transaction can not be negative"]
    },
    idempotencyKey:{
        type:String,
        required:[true,"Idempotency key is required for creating transaction"],
        index:true,
        unique:true,
    },


},{timestamps:true})

const transactionModel = mongoose.model("transactions",transactionSchema);
export default transactionModel;