import mongoose from "mongoose";

const AffiliateStatsSchema = new mongoose.Schema(
 {
  userId: { type: mongoose.Types.ObjectId, ref: "User" }, // Reference to the User model
  affiliateSales: { type: [mongoose.Types.ObjectId], ref: "Transaction" }, // Should match the Transaction model
 },
 { timestamps: true },
);

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatsSchema);
export default AffiliateStat;
