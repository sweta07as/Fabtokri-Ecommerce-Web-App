const Coupon = require("../models/couponModel");
const ErrorHandler = require("../utils/errorHandler.js");
const asyncError = require("../middleware/asyncError");

exports.createCoupon = asyncError(async (req, res, next) => {
  const newCoupon = await Coupon.create(req.body);
  res.status(201).json({
    success: true,
    newCoupon,
  });
});

exports.getAllCoupons = asyncError(async (req, res, next) => {
  const coupons = await Coupon.find();

  res.status(200).json({
    success: true,
    coupons,
  });
});

//Apply Coupon
exports.applyCoupon = asyncError(async (req, res, next) => {
  const {couponCode} = await req.body;
  const userId = req.user.id;

   const coupon = await Coupon.findOne({ name: couponCode });

   if (!coupon) {
        return next(new ErrorHandler("Invalid Coupon", 404));
   }

  //  if (coupon.usedBy.includes(userId)) {
  //    return next(new ErrorHandler("Coupon has already been used", 400));
  //  }

  //  coupon.usedBy.push(userId);
  //  await coupon.save();

  res.status(200).json({
    success: true,
    coupon,
  });
});

//Get Single Coupon Details
exports.getSingleCoupon = asyncError(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new ErrorHandler("Coupon not found", 404));
  }

  res.status(200).json({
    success: true,
    coupon,
  });
});

exports.updateCoupon = asyncError(async (req, res, next) => {
  let coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new ErrorHandler("Coupon not found", 404));
  }

  coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    coupon,
  });
});

exports.deleteCoupon = asyncError(async (req, res, next) => {
  let coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new ErrorHandler("Coupon not found", 404));
  }

  await coupon.remove(); //may need to use findByIdAndDelete

   res.status(200).json({
     success: true,
     message: "Coupon deleted successfully",
   });
});

