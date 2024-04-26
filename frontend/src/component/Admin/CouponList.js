import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminCoupon,
  deleteCoupon,
} from "../../actions/couponAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Metadata";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar.js";
import { DELETE_COUPON_RESET } from "../../constants/couponConstants";

const CouponList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, coupons } = useSelector((state) => state.coupons);

  const deleteCouponHandler = (id) => {
    dispatch(deleteCoupon(id));
  };

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.coupon
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Coupon Deleted Successfully");
      history.push("/admin/coupons");
      dispatch({ type: DELETE_COUPON_RESET });
    }

    dispatch(getAdminCoupon());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Coupon ID", minWidth: 300, flex: 0 },

    { field: "name", headerName: "Name", minWidth: 250, flex: 0 },

    // {
    //   field: "expiry",
    //   headerName: "Expiry",
    //   type: "date",
    //   minWidth: 200,
    //   flex: 0,
    // },

    {
      field: "discount",
      headerName: "Discount",
      type: "number",
      minWidth: 250,
      flex: 0,
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      sortable: false,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/coupon/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteCouponHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  coupons &&
    coupons.reverse().forEach((item) => {
      rows.push({
        id: item._id,
        // expiry: item.expiry,
        discount: item.discount,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL COUPONS - ADMIN`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL COUPONS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={8}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CouponList;
