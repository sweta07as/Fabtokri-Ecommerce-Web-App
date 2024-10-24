//RAZORPAY

const asyncError = require("../middleware/asyncError");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const Payment = require("../models/paymentModel");

exports.checkout = asyncError(async (req, res, next) => {

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  // console.log(order);

  res.status(200).json({
    success: true,
    order,
  });

});

exports.paymentVerification = asyncError(async (req, res) => {

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      // `http://15.206.67.237/paymentsuccess?reference=${razorpay_payment_id}`
      // `https://www.fabtokri.in/paymentsuccess?reference=${razorpay_payment_id}`
      // `${req.protocol}://${req.get('host')}/paymentsuccess?reference=${razorpay_payment_id}`
    );

  } else {
    res.status(400).json({
      success: false,
    });
  }
});
