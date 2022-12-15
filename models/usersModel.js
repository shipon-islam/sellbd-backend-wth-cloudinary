//@Date: 01/10/2022
//@Author: Shipon islam

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  avatar: {
    url: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/shiponislam/image/upload/v1671086960/avatar/man-ga229b3508_640_ymjahn.png",
    },
    public_id: {
      type: String,
    },
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
