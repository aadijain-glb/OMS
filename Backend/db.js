const mongoose = require("mongoose");

const connectDB = async () => {
  // await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connection disabled to prevent errors");
};

module.exports = connectDB;
