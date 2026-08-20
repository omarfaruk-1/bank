import mongoose from "mongoose";

const ledgerSchema=new mongoose.Schema({
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required: [true,"Ledger must be associated with an account"],
        index:true,
        immutable:true,

    },
    amount:{
        type:Number,
        required:[true,"Amount is required for creating a ledger"],
        immutable:true,
    },
    transaction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"transactions",
        required:[true,"Ledger must be associated a transaction"],
        index:true,
        immutable:true
    },
    type:{
        type:String,
        enum:{
            values:["debit","credit"],
            message:"Type can be either debit or credit"
        },
        required:[true,"Ledger type is required"],
        immutable:true
    },
})

function preventLedgerModification(){
    throw new Error("Ledger entries are immutable and can not be modified or delete");
}

ledgerSchema.pre("findOneAndUpdate",preventLedgerModification);
ledgerSchema.pre("updateOne",preventLedgerModification),
ledgerSchema.pre("deleteOne",preventLedgerModification);
ledgerSchema.pre("updateMany",preventLedgerModification);
ledgerSchema.pre("deleteMany",preventLedgerModification);
ledgerSchema.pre("findOneAndDelete",preventLedgerModification);
ledgerSchema.pre("findOneAndReplace",preventLedgerModification); 


const ledgerModel= mongoose.model("ledgers",ledgerSchema);

export default ledgerModel;