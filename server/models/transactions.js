import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    name: String, // Add the name field
    userId: String,
    cost: String,
    products: {
      type: [mongoose.Types.ObjectId],
      of: Number,
    },
    country: String,
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
