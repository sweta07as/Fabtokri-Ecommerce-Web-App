const express = require("express");

const {
  checkout, paymentVerification
} = require("../controllers/paymentPhonpeController.js");

const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/checkout").post(isAuthenticatedUser, checkout);

router
  .route("/paymentverification/:transactionId")
  .get(isAuthenticatedUser, paymentVerification);

module.exports = router;
