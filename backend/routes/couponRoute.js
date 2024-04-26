const express = require("express");

const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getSingleCoupon,
  applyCoupon,
} = require("../controllers/couponController.js");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/admin/coupon/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createCoupon);

router
  .route("/admin/coupons")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllCoupons);

router.route("/coupon/:id").get(getSingleCoupon);

router
  .route("/admin/coupon/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateCoupon)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteCoupon);

router.route("/coupons/apply").post(isAuthenticatedUser, applyCoupon);

module.exports = router;
