const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User, createUser } = require("../models/User");
const bcrypt = require("bcrypt");
const tokenGenerator = require("../utils/jwt");

// siginup route


router.post(
  "/",
  asyncHandler(async (req, res) => {
    var { email, password } = req.body;
    email = email.toLowerCase();
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      console.log("user already exists");
      res.send("User alredy exist");
    } else {
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          console.log(err);
        } else {
          User.create(createUser(email, hash), (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("successfully create user");
              User.findOne({ email: email }, (err, docs) => {
                if (err) {
                  console.log(err);
                } else {
                  // send email and jwt token
                  var token = tokenGenerator(docs._id.toString());
                  res.json({ email: email, token: token });
                }
              })
            }
          });
        }
      });
    }
  })
);

module.exports = router;
