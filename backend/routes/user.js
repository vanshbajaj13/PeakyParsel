const express = require("express");
const protect = require("../middlewares/authMiddleWare");
const { User } = require("../models/User");
const tokenGenerator = require("../utils/jwt");
const router = express.Router();

router.get("/:userEmail", (req, res) => {
  const userEmail = req.params.userEmail;
  User.findOne({ email: userEmail }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      if (docs) {
        res.json(docs);
      } else {
        res.send("No user found");
      }
    }
  });
});

router.post("/", protect, (req, res) => {
  User.findOne({email:req.body.email},(err,docs)=>{
    if (err) {
      res.send(err);
    } else {
      if(docs){
        var token = tokenGenerator(docs._id.toString());
        res.json({ email: docs.email, token: token });
      }
    }
  })
});

module.exports = router;
