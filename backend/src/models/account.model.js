import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "user id is required"],
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["active", "frozen", "closed"],
        message: "Status can be either active, frozen or closed",
      },
      default: "active",
    },
    currency: {
      type: String,
      required: [true, "Currency is required for creating an account"],
      default: "TK",
    },
  },
  { timestamps: true },
);

accountSchema.index({ user: 1, status: 1 });
accountSchema.methods.getBalance = async function () {
  const balanceData = await ledgerModel.aggregate([
    { $match: { account: this._id } },
    {
      $group: {
        _id: null,
        totalDebits: {
          $sum: {
            $cond: [{ $eq: ["$type", "debit"] }, "$amount", 0],
          },
        },
        totalCredits: {
          $sum: {
            $cond: [{ $eq: ["$type", "credit"] }, "$amount", 0],
          },
        },
      },
    },{
        $project: {
            _id: 0,
            balance: { $subtract: ["$totalCredits", "$totalDebits"] },
        },
    }
  ]);
  if (balanceData.length === 0) {   
    return 0;
  }
  return balanceData[0].balance;
};

const accountModel = mongoose.model("account", accountSchema);
export default accountModel;
