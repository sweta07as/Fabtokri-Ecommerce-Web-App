import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productsReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducer";

import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

import {
  couponReducer,
  newCouponReducer,
  couponsReducer,
  couponDetailsReducer,
  applyCouponReducer,
} from "./reducers/couponReducer";

import {
  pincodeReducer,
  trackShipmentReducer,
} from "./reducers/deliveryReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  coupon: couponReducer,
  coupons: couponsReducer,
  newCoupon: newCouponReducer,
  couponDetails: couponDetailsReducer,
  applyCoupon: applyCouponReducer,
  checkPincode: pincodeReducer,
  trackShipment: trackShipmentReducer,
});

let initialState = {};

if (typeof localStorage !== "undefined") {
  initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    },
  };
} else {
  initialState = {
    cart: {
      cartItems: [],
      shippingInfo: {},
    },
  };
}

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
