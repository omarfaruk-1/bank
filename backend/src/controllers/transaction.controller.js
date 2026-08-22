import transactionModel from "../models/transaction.model.js";
import accountModel from "../models/account.model.js";
import ledgerModel from "../models/ledger.model.js";
import mongoose from "mongoose";

async function createTransaction(req,res){
    try {
        const {fromAccount, toAccount, amount, idempotencyKey}=req.body;
        if(!fromAccount || !toAccount || !amount || !idempotencyKey){
            return res.status(400).json({
                message:"FromAccount, toAccount, amount, idempotencyKey all are required"
            })
        }
        const fromUserAccount = await accountModel.findOne({_id:fromAccount});
        const toUserAccount = await accountModel.findOne({_id:toAccount});

        if(!fromUserAccount|| !toUserAccount) return res.status(400).json({
            message: "Invalid fromAccount or toAccount",
        });

        const isTransactionAlreadyExist= await transactionModel.findOne({idempotencyKey:idempotencyKey});
        if(isTransactionAlreadyExist) {
            if(isTransactionAlreadyExist.status==="complete"){
                res.status(200).json({
                    message:"Transaction already processed",
                    transaction:isTransactionAlreadyExist
                })
            }
            if(isTransactionAlreadyExist.status==="pending"){
                res.status(200).json({
                    message:"Transaction is still pending",
                    transaction:isTransactionAlreadyExist
                })
            }
            if(isTransactionAlreadyExist.status==="failed"){
                res.status(400).json({
                    message:"Transaction already failed, please try again",
                })
            }
            if(isTransactionAlreadyExist.status==="reversed"){
                res.status(400).json({
                    message:"Transaction already reversed, please try again",
                })
            }
        }

        if(fromUserAccount.status !== "active" || toUserAccount.status !== "active"){
            return res.status(400).json({
                message:"Both accounts must be active to perform transaction"
            })
        }

        const balance = await fromUserAccount.getBalance();
        if(balance<amount){
            return res.status(400).json({
                message:`Insufficient balance in fromAccount. Current balance is ${balance}`
            })
        }

        const session = await mongoose.startSession();
        session.startTransaction();
        
        const transaction = await transactionModel.create({
            fromAccount,
            toAccount,
            amount,
            idempotencyKey,
            status:"pending"
        },{session});

        const debitLedgerEntry = await ledgerModel.create({
            account:fromAccount,
            amount:amount,
            transaction:newTransaction._id,
            type:"debit"
        },{session});

        const creditLedgerEntry = await ledgerModel.create({
            account:toAccount,
            amount:amount,
            transaction:newTransaction._id,
            type:"credit"
        },{session});

        transaction.status="complete";
        await transaction.save({session});

        await session.commitTransaction();
        session.endSession();

        await sendEmailTransaction(req.user.email,req.user.name, toAccount._id, amount);

        res.status(200).json({
            message:"Transaction completed successfully",
            transaction:newTransaction
        });

    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            error:error.message
        })
    }
}


export default {createTransaction};