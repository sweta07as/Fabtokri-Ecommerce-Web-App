import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { createCoupon, clearErrors } from "../../actions/couponAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Metadata";
import SpellCheckIcon from "@material-ui/icons/Spellcheck";
// import ExpiryDateIcon from "@material-ui/icons/CalendarViewDay";
import DiscountIcon from "@material-ui/icons/LocalOffer";
import SideBar from "./Sidebar.js";
import { NEW_COUPON_RESET } from "../../constants/couponConstants";

const NewCoupon = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newCoupon);

  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  // const [expiry, setExpiry] = useState("");


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Coupon Created Successfully");
      history.push("/admin/coupons");
      dispatch({ type: NEW_COUPON_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createCouponSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("discount", discount);
    // myForm.set("expiry", expiry);

    dispatch(createCoupon(myForm));
  };

  return (
    <Fragment>
      <MetaData title="Create Coupon" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createCouponSubmitHandler}
          >
            <h1>Create Coupon</h1>

            <div>
              <SpellCheckIcon />
              <input
                type="text"
                placeholder="Coupon Name"
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
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewCoupon;
