import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import axios from "axios";

//Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });
  if (typeof localStorage !== 'undefined') {
    // Access the localStorage object or execute code that depends on it
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  }
};

//REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });
  if (typeof localStorage !== 'undefined') {
    // Access the localStorage object or execute code that depends on it
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  }
};

//SAVE SHIIPPING INFO
export const saveShippingInfo = (data) => async (dispatch, getState) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  if (typeof localStorage !== 'undefined') {
    // Access the localStorage object or execute code that depends on it
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  }
};

