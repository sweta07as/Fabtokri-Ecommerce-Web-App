import React from "react";
import "./Sidebar.css";
// import logo from "../../images/logopng.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* <Link to="/"> */}
      {/* <img src={logo} alt="Fabtokri" /> */}
      {/* </Link> */}

      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon style={{ color: "#800039" }} />}
          defaultExpandIcon={<ImportExportIcon style={{ color: "#800039" }} />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem
                nodeId="2"
                label="All"
                icon={<PostAddIcon style={{ color: "#800039" }} />}
              />
            </Link>

            <Link to="/admin/product">
              <TreeItem
                nodeId="3"
                label="Create"
                icon={<AddIcon style={{ color: "#800039" }} />}
              />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>

      <Link to="/admin/orders">
        <p>
          <ListAltIcon /> Orders
        </p>
      </Link>

      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>

      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon /> Reviews
        </p>
      </Link>

      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon style={{ color: "#800039" }} />}
          defaultExpandIcon={<ImportExportIcon style={{ color: "#800039" }} />}
        >
          <TreeItem nodeId="1" label="Coupons">
            <Link to="/admin/coupons">
              <TreeItem
                nodeId="2"
                label="All"
                icon={<PostAddIcon style={{ color: "#800039" }} />}
              />
            </Link>

            <Link to="/admin/coupon">
              <TreeItem
                nodeId="3"
                label="Create"
                icon={<AddIcon style={{ color: "#800039" }} />}
              />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
    </div>
  );
};

export default Sidebar;
