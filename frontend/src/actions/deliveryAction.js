import axios from 'axios';

import {
  CHECK_PINCODE_REQUEST,
  CHECK_PINCODE_SUCCESS,
  CHECK_PINCODE_FAIL,
  TRACK_SHIPMENT_REQUEST,
  TRACK_SHIPMENT_SUCCESS,
  TRACK_SHIPMENT_FAIL,
  CLEAR_ERRORS,
} from "../constants/deliveryConstants.js";

export const checkPincode = (pincode) => async (dispatch) => {
  try {
    dispatch({ type: CHECK_PINCODE_REQUEST });

    // Make an API request to your backend to check the PIN code
    const { data } = await axios.get(`/api/v1/check-pincode?pinCode=${pincode}`);

    dispatch({
      type: CHECK_PINCODE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHECK_PINCODE_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const trackShipment = (waybill) => async (dispatch) => {
  try {
    dispatch({ type: TRACK_SHIPMENT_REQUEST });

    // Make an API request to your backend to check the PIN code
    const { data } = await axios.get(
      `/api/v1/track-shipment?waybill=${waybill}`
    );

    dispatch({
      type: TRACK_SHIPMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRACK_SHIPMENT_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};