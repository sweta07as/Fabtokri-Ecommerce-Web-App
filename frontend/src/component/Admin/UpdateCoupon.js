import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCoupon,
  getSingleCoupon,
  clearErrors,
} from "../../actions/couponAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Metadata";
import SpellCheckIcon from "@material-ui/icons/Spellcheck";
// import ExpiryDateIcon from "@material-ui/icons/CalendarViewDay";
import DiscountIcon from "@material-ui/icons/LocalOffer";
import SideBar from "./Sidebar.js";
import { UPDATE_COUPON_RESET } from "../../constants/couponConstants";
import "./NewProduct.css";

const UpdateCoupon = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, coupon } = useSelector((state) => state.couponDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.coupon);

  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  // const [expiry, setExpiry] = useState("");

  const couponId = match.params.id;

  useEffect(() => {
    if (coupon && coupon._id !== couponId) {
      dispatch(getSingleCoupon(couponId));
    } else {
      setName(coupon.name);
      setDiscount(coupon.discount);
      // setExpiry(coupon.expiry);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Coupon Updated Successfully");
      history.push("/admin/coupons");
      dispatch({ type: UPDATE_COUPON_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    couponId,
    coupon,
    updateError,
  ]);

  const updateCouponSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

     myForm.set("name", name);
     myForm.set("discount", discount);
    //  myForm.set("expiry", expiry);

    dispatch(updateCoupon(couponId, myForm));
  };

  
  return (
    <Fragment>
      <MetaData title="Update Coupon" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateCouponSubmitHandler}
          >
            <h1>Update Coupon</h1>

            <div>
              <SpellCheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <DiscountIcon />
              <input
                type="number"
                placeholder="Discount"
                required
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            {/* <div>
              <ExpiryDateIcon />
              <input
                type="number"
                placeholder="Date"
                required
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div> */}

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateCoupon;
