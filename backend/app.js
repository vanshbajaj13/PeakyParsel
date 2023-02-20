const express = require("express");
const connectToMongo = require("./db");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
connectToMongo();
const app = express();
app.use(express.json());

app.use("/requests", require("./routes/request"));
app.use("/signup", require("./routes/auth"));
app.use("/signin", require("./routes/login"));
app.use("/user", require("./routes/user"));

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // handle all routes other than defined by us above
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("hello world!");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server started on \n http://localhost:5000");
});
