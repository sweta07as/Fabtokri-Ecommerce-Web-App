const mongoose = require("mongoose");
 //NOT USED IN PHONPE //USED IN RAZORPAY
const paymentSchema = new mongoose.Schema({
  // razorpay_order_id: {
  //   type: String,
  //   required: true,
  // },
  // razorpay_payment_id: {
  //   type: String,
  //   required: true,
  // },
  // razorpay_signature: {
  //   type: String,
  //   required: true,
  // },
  transaction_id: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Payment", paymentSchema);
