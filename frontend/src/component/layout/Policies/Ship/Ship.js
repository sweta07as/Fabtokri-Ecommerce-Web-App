import React from "react";
import "./Ship.css";

const Ship = () => {
  return (
    <div className="para">
      <h1>SHIPPING POLICY</h1>
      <hr></hr>

      <p>
        As soon as we receive your order, we will intimate the concerned weaver
        about the same. Normally, the weaver will send the product to our site
        office the same day and it will be dispatched to you the next day.
        However, sometimes the weaver may still be in the process of finishing
        his work and may request some time to deliver the product to our office.
        In this case we will intimate to you the approximate day when it will be
        shipped. We will deliver the product in minimum 2 days to maximum 7 days
        after receiving order. If you are not satisfied, we will refund you the
        entire amount.
      </p>

      <h3>Shipping within India</h3>
      <p>
        Shipping is free for orders above Rs. 2000. For all other orders we
        charge Rs. 100 for shipping.  
      </p>

      <h3>International Shipping</h3>
      <p>
        For out of India shipments, shipping charges are based on the product
        weight.  Import Duties & Taxes if applicable, to be borne by Customer.
      </p>
    </div>
  );
};

export default Ship;
