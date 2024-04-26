import React, { Fragment, useEffect, useState } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Metadata";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { clearErrors, getOrderDetails } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import axios from "axios";

import { trackShipment } from "../../actions/deliveryAction";


const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const {
    shipmentStatus,
    statusLocation,
    statusDateTime,
    statusType,
    statusCode,
  } = useSelector((state) => state.trackShipment);

  const dispatch = useDispatch();
  const alert = useAlert();


  //Check Payment Status //Phonpe API

  // const [responseCode, setResponseCode] = useState("pending");

  // const checkPaymentStatusHandler = async (paymentInfoId) => {
  //   try {
  //     const {
  //       data: { response, statusCode },
  //     } = await axios.get(
  //       `/api/v1/paymentverification/${paymentInfoId}` //check status api called
  //     );

  //     setResponseCode(statusCode);

  //     console.log("orderstatus:", order.paymentInfo.status);
  //     console.log("response:", response);
  //     console.log("order:", order);
  //     console.log("statusCode:", statusCode);
  //     console.log("responseCode:", responseCode);

  //     dispatch(getOrderDetails(match.params.id));
  //   } catch (error) {
  //     console.error("Error fetching responseCode:", error);
  //   }
  // };

  // useEffect(() => {
  //   checkPaymentStatusHandler();
  // }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);

  useEffect(() => {
    // Check if the order is available and its orderStatus is not "Processing"
    if (order && order.orderStatus !== "Processing") {
      // Dispatch trackShipment with the waybill value
      dispatch(trackShipment(order.waybill));
    }

    // // If order.paymentInfo.id is available, call checkPaymentStatusHandler
    // if (
    //   order &&
    //   order.paymentInfo &&
    //   order.paymentInfo.id &&
    //   (order.paymentInfo.status === "pending" ||
    //     order.paymentInfo.status === "initiated")
    // ) {
    //   checkPaymentStatusHandler(order.paymentInfo.id);
    // }
  }, [dispatch, order]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>

                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>

                <div>
                  <p>Email:</p>
                  <span>{order.shippingInfo && order.user.email}</span>
                </div>

                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : order.paymentInfo &&
                          (order.paymentInfo.status === "pending" ||
                            order.paymentInfo.status === "initiated")
                        ? "yellowColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : order.paymentInfo &&
                        (order.paymentInfo.status === "pending" ||
                          order.paymentInfo.status === "initiated")
                      ? "PENDING"
                      : "NOT PAID"}
                  </p>
                </div>
                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
                <div>
                  <p>Transaction Id:</p>
                  <span>{order.paymentInfo && order.paymentInfo.id}</span>
                </div>
                <div>
                  <p>Transaction Status:</p>
                  <span>{order.paymentInfo && order.paymentInfo.status}</span>
                </div>
                <div>
                  <p>Date:</p>
                  <span>
                    {order.paidAt &&
                      new Date(order.paidAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                  </span>
                </div>
              </div>
              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
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
            {order.orderStatus !== "Processing" && (
              <div className="shipmentTracking">
                <Typography>Your Order Updates:</Typography>
                <div className="shipmentTrackContainer">
                  {shipmentStatus ? (
                    <div>
                      <p>Status: {shipmentStatus}</p>
                      <p>Status Type: {statusLocation}</p>
                      <p>Status DateTime: {statusDateTime}</p>
                      <p>Status Code: {statusCode}</p>
                      <p>Status Type: {statusType}</p>
                    </div>
                  ) : (
                    <p>Loading shipment data...</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
