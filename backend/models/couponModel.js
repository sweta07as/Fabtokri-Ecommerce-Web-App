const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  // usedBy: {
  //   type: [mongoose.Schema.ObjectId],
  //   ref: "User",
  //   default: [],
  // },
  // expiry: {
  //   type: Date,
  //   required: true,
  // },
  discount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Coupon", couponSchema);
