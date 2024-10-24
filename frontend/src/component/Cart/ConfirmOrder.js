import React, { Fragment, useState, useEffect } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Metadata";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import axios from "axios";
// import { useAlert } from "react-alert";
// import Logo from "../../images/android-chrome-192x192.png";

import { applyCoupon } from "../../actions/couponAction";
// import { APPLY_COUPON_SUCCESS } from "../../constants/couponConstants";

// import { removeItemsFromCart } from "../../actions/orderAction.js";

import { removeItemsFromCart } from "../../actions/cartAction";

import { createOrder } from "../../actions/orderAction.js";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const alert = useAlert();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 1; //change back to 0 : 200
  // const tax = subtotal * 0.18;

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const { success, coupon, error } = useSelector((state) => state.applyCoupon);

  const totalPrice = shippingCharges + subtotal - discountAmount;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const applyCouponHandler = async () => {
    setAppliedCoupon(couponCode);
    await dispatch(applyCoupon(couponCode));

    if (error) {
      setDiscountAmount(0);
      // alert.error("Invalid Coupon");
    }
  };

  const removeCouponHandler = () => {
    setDiscountAmount(0);
    if (appliedCoupon && success) {
      setAppliedCoupon(null);
      dispatch(applyCoupon(""));
    }
  };

  useEffect(() => {
    if (success) {
      setDiscountAmount((subtotal * coupon.coupon.discount) / 100);
    }
  }, [success, coupon, subtotal]);

  const checkoutHandler = async (amount, userId) => {
    // const {
    //   data: { key },
    // } = await axios.get("/api/v1/getkey");

    //RAZORPAY

    const {
      data: { responseCode, responseUrl, transactionId },
    } = await axios.post("/api/v1/checkout", {
      amount,
      userId,
    });


    //creating order before payment
    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: subtotal,
      shippingPrice: shippingCharges,
      totalPrice: totalPrice,
      paymentInfo: {
        id: transactionId,
        status: "initiated",
      },
    };

    cartItems.forEach((item) => {
      dispatch(removeItemsFromCart(item.product));
    });

    dispatch(createOrder(order));


    //RAZORPAY

    // const options = {
    //   key,
    //   amount: order.amount,
    //   currency: "INR",
    //   name: "FabTokri",
    //   description: "Ecommerce Website",
    //   image: Logo,
    //   order_id: order.id,
    //   callback_url: "http://localhost:4000/api/v1/paymentverification",
    //   // callback_url: "http://15.206.67.237/api/v1/paymentverification",
    //   // callback_url: `${window.location.origin}/api/v1/paymentverification`,

    //   prefill: {
    //     name: user.name,
    //     email: user.email,
    //     contact: shippingInfo.phoneNo,
    //   },
    //   notes: {
    //     address: "Razorpay Corporate Office",
    //   },
    //   theme: {
    //     color: "#800039",
    //   },
    // };

    // const razor = new window.Razorpay(options);
    // razor.open();

    // const data = {
    //   subtotal,
    //   shippingCharges,
    //   // tax,
    //   totalPrice,
    //   transactionId,
    // };

    const data = {
      transactionId
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    if (responseCode === "PAYMENT_INITIATED") {
      // Redirect the user to the PhonePe payment page
      window.location.href = responseUrl;
    }
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Email:</p>
                <span>{user.email}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X {item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              {appliedCoupon && success && !error && (
                <div className="discountSection">
                  <p>Discount:</p>
                  <span>{appliedCoupon}</span>
                  <button
                    className="removeButton"
                    onClick={removeCouponHandler}
                  >
                    Remove
                  </button>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}

              {error && (
                <div>
                  <p>Discount:</p>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}

              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              {/* <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div> */}
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            {!appliedCoupon && !error && (
              <div className="couponInput">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="couponInputField"
                  onChange={handleCouponChange}
                />
                <button
                  className="applyCouponButton"
                  onClick={applyCouponHandler}
                >
                  APPLY
                </button>
              </div>
            )}

            {error && (
              <div className="couponInput">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="couponInputField"
                  onChange={handleCouponChange}
                />
                <button
                  className="applyCouponButton"
                  onClick={applyCouponHandler}
                >
                  APPLY
                </button>
              </div>
            )}

            <button onClick={() => checkoutHandler(totalPrice, user.id)}>
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
