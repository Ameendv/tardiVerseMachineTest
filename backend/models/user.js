const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    number: { type: Number},
    password: { type: String },
    confirmPassword: { type: String },
    bookings: { type: Array },
    isBlocked: { type: Boolean, default: false },
    idVerified: { type: Boolean, default: false },
    },
  { collection: "user" }
);

const model = mongoose.model("UserData", user);

module.exports = model;