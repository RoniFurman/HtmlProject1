const mongoose = require("mongoose");

module.exports.connect = async () => {
  try {
    const uri =
      process.env.NODE_ENV === "development" && process.env.MONGO_URI_LOCAL
        ? process.env.MONGO_URI_LOCAL
        : process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is not set in .env");

    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
