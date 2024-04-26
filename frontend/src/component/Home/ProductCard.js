import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "./Home.css";

const ProductCard = ({ product }) => {
  const options = {
    // edit: false,
    // color: "rgba(20,20,20,0.1)",
    // activeColor: "rgb(128, 0, 57)",
    // size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      {/* <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          ({product.numOfReviews} Reviews)
        </span>
      </div> */}
      <div class="priceInfoHome">
        <h1>{`₹${product.price}`}</h1>
        {product.discount > 0 && (
          <>
            <h3>{`₹${Math.round(
              product.price / (1 - product.discount / 100)
            )}`}</h3>
            <h2
              className="priceInfoDiscount"
              style={{
                color: "green",
                font: '400 1.2vmax "Franklin Gothic Medium"',
                margin: "0vmax 0.5vmax",
              }}
            >{`(${product.discount}% OFF)`}</h2>
          </>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
