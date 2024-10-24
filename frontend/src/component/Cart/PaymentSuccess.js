import React, { Fragment, useEffect, useState } from "react";
import "./PaymentSuccess.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import PendingIcon from "@material-ui/icons/HourglassEmpty";

import { useSelector } from "react-redux";

// import { updatePaymentInfoInOrder } from "../../actions/orderAction";

import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

// import { useLocation } from "react-router-dom";

import axios from "axios";

import Loader from "../layout/Loader/Loader.js";

const PaymentSuccess = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { 
    // shippingInfo, cartItems, 
    loading } = useSelector(
    (state) => state.cart
  );

  // const { user } = useSelector((state) => state.user);
  // const { error } = useSelector((state) => state.newOrder);

  const [responseCode, setResponseCode] = useState("pending");

  // const dispatch = useDispatch();

  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const referenceNum = searchParams.get("reference");

  const fetchResponseCode = async () => {
    try {
      const {
        data: { response, statusCode, order },
      } = await axios.get(
        `/api/v1/paymentverification/${orderInfo.transactionId}` //check status api called
      );

      setResponseCode(statusCode);
      
      console.log("orderstatus:", order.paymentInfo.status);
      console.log("response:", response);
      console.log("order:", order);
      console.log("statusCode:", statusCode);
      console.log("responseCode:", responseCode);
    } catch (error) {
      console.error("Error fetching responseCode:", error);
    }
  };

  useEffect(() => {
    fetchResponseCode();
  });

  const handlePaymentVerification = () => {
    // Call the fetchResponseCode function to make the API call
    fetchResponseCode();
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {responseCode === "PAYMENT_SUCCESS" ? (
            <div className="paymentStatus">
              <CheckCircleIcon />
              <Typography>Your payment is successful</Typography>
              <Link to="/orders">View Orders</Link>
            </div>
          ) : responseCode === "PAYMENT_PENDING" ||
            responseCode === "INTERNAL_SERVER_ERROR" ? (
            <div className="paymentStatus">
              <PendingIcon />
              <Typography>Your payment is pending...</Typography>
              {/* <Link to="/orders">View Orders</Link> */}
              <button className="verifyPayment" onClick={handlePaymentVerification}>
                Verify Payment
              </button>
            </div>
          ) : responseCode === "BAD_REQUEST" ||
            responseCode === "AUTHORIZATION_FAILED" ||
            responseCode === "PAYMENT_ERROR" ||
            responseCode === "TRANSACTION_NOT_FOUND" ||
            responseCode === "PAYMENT_DECLINED" ||
            responseCode === "TIMED_OUT" ? (
            <div className="paymentStatus">
              <ErrorIcon />
              <Typography>Payment failed. Please try again.</Typography>
              <Link to="/orders">View Orders</Link>
            </div>
          ) : (
            ""
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default PaymentSuccess;
