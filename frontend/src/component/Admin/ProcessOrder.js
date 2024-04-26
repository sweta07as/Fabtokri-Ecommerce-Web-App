import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Metadata";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar.js";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";

import { trackShipment } from "../../actions/deliveryAction";

import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

import { TRACK_SHIPMENT_RESET } from "../../constants/deliveryConstants"; // Add your constants here

import "./ProcessOrder.css";
import "./NewProduct.css";
import "../Cart/ConfirmOrder.css";
import "../Order/OrderDetails.css";

const ProcessOrder = ({ history, match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const {
    shipmentStatus,
    statusLocation,
    statusDateTime,
    statusType,
    statusCode,
  } = useSelector((state) => state.trackShipment);

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");
  const [waybill, setWaybill] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    console.log("Waybill:", waybill);
    const myForm = new FormData();

    myForm.set("status", status);
    myForm.set("waybill", waybill);

    console.log("Form data:", myForm);

    // if (order && order.orderStatus !== "Processing") {
    //   dispatch(trackShipment(waybill));
    // }
    
    dispatch(updateOrder(match.params.id, myForm));

    // Dispatch trackShipment with the waybill value
    dispatch(trackShipment(waybill));

  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id, isUpdated, updateError]);

  useEffect(() => {
    // Check if the order is available and its orderStatus is not "Processing"
    if (order && order.orderStatus !== "Processing") {
      // Dispatch trackShipment with the waybill value
      dispatch(trackShipment(waybill));
    }
  }, [dispatch, order]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
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
                      <span>
                        {order.shippingInfo && order.user.email}
                      </span>
                    </div>

                    <div>
                      <p>Address:</p>
                      <span>
                        {order &&
                          order.shippingInfo &&
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
                      <span>
                        {order.paymentInfo && order.paymentInfo.status}
                      </span>
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
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div
                    className="confirmCartItemsContainer"
                    // style={{ maxHeight: "6vmax" }}
                  >
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
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
                          <p>Waybill: {waybill}</p>
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

              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select
                      // value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Choose Category</option>

                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  {order.orderStatus !== "Delivered" && (
                    <div className="waybillCSS">
                      <input
                        type="number"
                        placeholder="Enter waybill"
                        required
                        value={waybill}
                        onChange={(e) => {
                          setWaybill(e.target.value);
                          console.log("Waybill input changed:", e.target.value);
                        }}
                        name="waybill"
                      />
                    </div>
                  )}

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading
                        ? true
                        : false || status === ""
                        ? true
                        : false || waybill === 0
                        ? true
                        : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
