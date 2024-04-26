const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler.js");
const asyncError = require("../middleware/asyncError");
const { paymentVerification } = require("./paymentController");
const crypto = require("crypto");
const https = require("https");
const checkStatusApi = require("../utils/phonepePayment");

//Create new order
exports.newOrder = asyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Get single order details
exports.getSingleOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  const transactionId = order.paymentInfo.id;
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  //not working correctly for more than 1 product in stock
  if (order.paymentInfo.status === "succeeded") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }

  // Check the order status and call paymentVerification if necessary
  if (
    order && order.paymentInfo && (order.paymentInfo.status === "pending" ||
    order.paymentInfo.status === "initiated")
  ) {
    await checkStatusApi(transactionId);
  }


  res.status(200).json({
    success: true,
    order,
  });
});

//Get logged in user orders
exports.myOrders = asyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//Get all orders --Admin
exports.getAllOrders = asyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//Update order status --Admin
exports.updateOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  console.log("Req", req.body);

  // Update the waybill here
  if (req.body.waybill) {
    order.waybill = req.body.waybill;
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity; //used small s in stock

  await product.save({ validateBeforeSave: false });
}

//delete order --Admin
exports.deleteOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});


// Function to make an HTTP GET request with options
function makeHttpGetRequest(url, headers) {
  return new Promise((resolve, reject) => {
    const options = {
      // method: "GET",
      headers: headers,
      followRedirect: true, //added for prod
    };

    https.get(url, options, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        resolve(data);
      });

      response.on("error", (error) => {
        // Use response.on for error handling
        reject(error);
      });
    });
  });
}
 