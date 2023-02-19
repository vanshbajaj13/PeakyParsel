const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const tokenGenerator = require("../utils/jwt");

// sigin route


router.post(
  "/",
  asyncHandler(async (req, res) => {
    var { email, password } = req.body;
    email = email.toLowerCase();
    User.findOne({ email: email }, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        if (docs === null) {
            res.send("invalid credential");
        } else {
          bcrypt.compare(password, docs.password, function (err, result) {
            if (err) {
              console.log(err);
              res.send("invalid credential");
            } else {
              if (result) {
                var token = tokenGenerator(docs._id.toString());
                res.json({ email: docs.email, token: token });
              } else {
                res.send("invalid password");
              }
            }
          });
        }
      }
    });
  })
);

module.exports = router;
