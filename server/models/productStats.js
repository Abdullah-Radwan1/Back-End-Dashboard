import mongoose from "mongoose";

const productStatSchema = new mongoose.Schema(
 {
  productId: String,
  yearlySalesTotal: Number,
  yearlyTotalSoldUnits: Number,
  year: Number,
  monthlyData: [
   {
    month: String,
    totalSales: Number,
    totalUnits: Number,
   },
  ],
  dailyData: [
   {
    date: String,
    totalSales: Number,
    totalUnits: Number,
   },
  ],
 },
 { timestamps: true },
);

const productStat = mongoose.model("productStat", productStatSchema);
export default productStat;
