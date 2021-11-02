const mongoose = require("mongoose"); // import mongoose
const config = require("config"); // import config.json

const db = config.get("mongoURI"); // gets mongodb database

// connect to database function
const connectDb = async () => {
  try {
    await mongoose.connect(
      db /*{
      useNewURLParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }*/
    );
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
