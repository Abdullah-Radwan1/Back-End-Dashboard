import Product from "../models/product.js";
import ProductStat from "../models/productStats.js";
import User from "../models/user.js";
import Transactionsmodel from "../models/transactions.js";
import getCountryISO3 from "country-iso-2-to-3";
export const getproducts = async (req, res) => {
 try {
  const products = await Product.find();
  const productsWithstats = await Promise.all(
   products.map(async (p) => {
    const stat = await ProductStat.find({ productId: p._id });
    return {
     ...p._doc,
     stat,
    };
   }),
  );

  res.status(200).json(productsWithstats);
 } catch (error) {
  res.status(404).json({ message: error.message });
 }
};

export const getCostumers = async (req, res) => {
 try {
  const customers = await User.find({ role: "user" }).select("-password");
  res.status(200).json(customers);
 } catch (error) {
  res.status(404).json({ message: error.message });
 }
};

export const getTransactions = async (req, res) => {
 try {
  // sort should look like this: { "field": "userId", "sort": "desc"}
  const { page = 0, pageSize = 20, sort = null, search = "" } = req.query;

  // formatted sort should look like { userId: -1 }
  const generateSort = () => {
   const sortParsed = JSON.parse(sort);
   const sortFormatted = {
    [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
   };

   return sortFormatted;
  };
  const sortFormatted = Boolean(sort) ? generateSort() : {};

  const transactions = await Transactionsmodel.find({
   $or: [
    { cost: { $regex: new RegExp(search, "i") } },
    { userId: { $regex: new RegExp(search, "i") } },
   ],
  })
   .sort(sortFormatted)
   .skip(page * pageSize)
   .limit(pageSize);

  const total = await Transactionsmodel.countDocuments({
   name: { $regex: search, $options: "i" },
  });

  res.status(200).json({
   transactions,
   total,
  });
 } catch (error) {
  res.status(404).json({ message: error.message });
 }
};

export const getGeography = async (req, res) => {
 try {
  const user = await User.find();
  const mappedLocations = user.reduce((acc, { country }) => {
   const countryISO3 = getCountryISO3(country);
   if (!acc[countryISO3]) {
    acc[countryISO3] = 0;
   }
   acc[countryISO3]++;
   return acc;
  }, {});

  // Convert the object to an array of [key, value] pairs using Object.entries
  const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => {
   return { id: country, value: count };
  });

  res.status(200).json(formattedLocations);
 } catch (error) {
  res.status(404).json({ message: error.message });
 }
};
