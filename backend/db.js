const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

function connectToMongo() {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO_URI, () => {
    console.log("connected to mongo successfully");
  });
}

module.exports = connectToMongo;
