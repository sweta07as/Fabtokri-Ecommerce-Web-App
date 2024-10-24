import React, { Fragment, useEffect } from "react";
// import { CgMouse } from "react-icons/all";
import "./Home.css";
import MetaData from "../layout/Metadata";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard.js";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";
// import Red from "../../images/Red.JPG";
// import Weaver from "../../images/Weaver.JPG";
// import Loomsbluee from "../../images/Loomsbluee.jpg";
// import Black from "../../images/Black.jpg";
// import White from "../../images/White.JPG";
// import Cutting from "../../images/Cutting.JPG";
import One from "../../images/One.png";
import Two from "../../images/Two.png";
import Three from "../../images/Three.png";
import Four from "../../images/Four.png";
import Five from "../../images/Five.png";

import Dupatta from "../../images/Dupatta.png";
import Stole from "../../images/Stole.png";
import Saree from "../../images/Saree.png";
import { Link } from "react-router-dom"; 
// import { useHistory } from "react-router-dom";


const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  const images = [One, Two, Three, Four, Five];

  // const history = useHistory();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="FabTokri" />
          <div className="banner">
            <Carousel
              stopAutoPlayOnHover={false}
              interval={5000}
              navButtonsProps={{
                style: {
                  marginLeft: 50,
                  marginRight: 50,
                },
              }}
              animation="slide"
              reverseEdgeAnimationDirection
            >
              {images.map((image, i) => (
                <Paper key={i}>
                  <img
                    className="SliderImage"
                    key={i}
                    src={image}
                    alt={`${i} Slide`}
                  />
                </Paper>
              ))}
            </Carousel>
            {/* 
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a> */}
          </div>
          <h2 className="homeHeading">
            GRAB YOUR
            <span className="homeHeadingSpan">TOKRI</span>
          </h2>

          <div className="categoryLinks">
            <Link className="categoryLink" to="/products?category=dupatta">
              <img src={Dupatta} alt="Dupatta" />
              <p>Dupatta</p>
            </Link>
            <Link className="categoryLink" to="/products?category=stole">
              <img src={Stole} alt="Stole" />
              <p>Stole</p>
            </Link>

            <Link className="categoryLink" to="/products?category=saree">
              <img src={Saree} alt="Saree" />
              <p>Saree</p>
            </Link>
          </div>
          {products && products.some((product) => product.discount > 0) && (
            <h2 className="homeHeading" style={{ marginBottom: "0" }}>
              ON SALE
            </h2>
          )}
          <div className="container" id="container">
            {products &&
              products
                .filter((product) => product.discount > 0)
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>
          {products && products.some((product) => product.discount === 0) && (
            <h2 className="homeHeading" style={{ marginBottom: "0" }}>
              BEST SELLER
            </h2>
          )}
          <div className="container" id="container">
            {products &&
              products
                .filter((product) => product.discount === 0)
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
