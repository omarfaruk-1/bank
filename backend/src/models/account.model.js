import mongoose from "mongoose";


const accountSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:[true,"user id is required"],
        index:true
    },
    status:{
        type:String,
        enum:{
            values:["active","frozen","closed"],
            message:"Status can be either active, frozen or closed",
        },
        default:"active"
    },
    currency:{
        type:String,
        required:[true,"Currency is required for creating an account"],
        default:"TK"
    },

},{timestamps:true});

accountSchema.index({user:1,status:1});

const accountModel = mongoose.model("account",accountSchema);
export default accountModel;