const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("hello world!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server started on \n http://localhost");
});
