const express = require("express");
const router = express.Router();
const { Request } = require("../models/Request");
const protect = require("../middlewares/authMiddleWare");

// request route


router.get("/", protect, (req, res) => {
  var date = Date.now();
  date = date - 86400000;
  Request.find({ time: { $gte: date } }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(docs);
      res.json(docs);
    }
  });
});
router.post("/",protect, (req, res) => {
  const request = req.body;
  Request.create(request, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete("/:requestId",protect, (req, res) => {
  const requestId = req.params.requestId;
  Request.deleteOne({ requestId: requestId }, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Request deleted successfully");
    }
  });
});

router.patch("/:requestId",protect, (req, res) => {
  const requestId = req.params.requestId;
  const acceptedBy = req.body.acceptedBy;
  Request.updateOne(
    { requestId: requestId },
    { status: { isAccepted: true, acceptedBy: acceptedBy } },
    (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("successfully accepted");
      }
    }
  );
});
module.exports = router;
