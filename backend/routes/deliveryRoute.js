const express = require("express");

const{
    checkPincode,
    trackShipment
} = require("../controllers/deliveryController.js")

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/check-pincode")
  .get(isAuthenticatedUser, checkPincode);

router.route("/track-shipment").get(isAuthenticatedUser, trackShipment);

module.exports = router;