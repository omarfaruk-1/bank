import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required for create an account"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        lowercase:true,
        match:[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,"Invalid email address"],
        unique:[true,"Email already exist"],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password minimum 6 character"],
        select:false
    },   
},{timestamps:true});

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return 
    }
    const hash= await bcrypt.hash(this.password,10);
    this.password=hash;
})

userSchema.methods.comparePassword=(async function(password){
    return await bcrypt.compare(password,this.password);
})



const userModel= mongoose.model("users",userSchema);

export default userModel;