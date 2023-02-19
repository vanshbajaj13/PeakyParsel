const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    parsel: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    requestId: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    description: String,
    status: {
      isAccepted :  {
        type:Boolean,
        default:false
      },
      acceptedBy : {
        type:String,
        default:""
      }
    },
    lastTime: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
    },
  },
  { timestamps: true }
);

function createRequest(
  email,
  parsel,
  owner,
  requestId,
  location,
  description,
  mobile,
  lastTime
) {
  const request = new Request({
    email: email,
    parsel: parsel,
    owner: owner,
    requestId: requestId,
    location: location,
    description: description,
    mobile: mobile,
    lastTime: lastTime,
  });
  return request;
}
const Request = new mongoose.model("Request", requestSchema);
module.exports = { Request, createRequest };
