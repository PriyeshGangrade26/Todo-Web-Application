const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to Mongodb Database ${mongoose.connection.host}`.white
    );
  } catch (error) {
    console.log(`MONGO Connect Error ${error}`.red);
  }
};

module.exports = connectDB;
