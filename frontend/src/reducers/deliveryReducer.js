// reducers/delhiveryReducer.js

import {
  CHECK_PINCODE_REQUEST,
  CHECK_PINCODE_SUCCESS,
  CHECK_PINCODE_FAIL,
  CHECK_PINCODE_RESET,
  TRACK_SHIPMENT_REQUEST,
  TRACK_SHIPMENT_SUCCESS,
  TRACK_SHIPMENT_FAIL,
  TRACK_SHIPMENT_RESET,
  CLEAR_ERRORS
} from "../constants/deliveryConstants.js";

// Initial state
const initialStatePincode = {
  loading: false,
  prepaid: false,
  serviceability: null,
  error: null,
};

const initialStateTrack = {
  loading: false,
  shipmentStatus: null,
  statusLocation: null,
  statusDateTime: null,
  statusType: null,
  statusCode: null,
  error: null,
};

// Reducer function
export const pincodeReducer = (state = initialStatePincode, action) => {
  switch (action.type) {
    case CHECK_PINCODE_REQUEST:
      return { ...state, loading: true };

    case CHECK_PINCODE_SUCCESS:
      return {
        ...state,
        loading: false,
        prepaid: action.payload.prepaid,
        serviceability: action.payload.serviceability,
      };

    case CHECK_PINCODE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CHECK_PINCODE_RESET:
      return initialStatePincode;

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const trackShipmentReducer = (state = initialStateTrack, action) => {
  switch (action.type) {
    case TRACK_SHIPMENT_REQUEST:
      return { ...state, loading: true };

    case TRACK_SHIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        shipmentStatus: action.payload.shipmentStatus,
        statusLocation: action.payload.statusLocation,
        statusDateTime: action.payload.statusDateTime,
        statusType: action.payload.statusType,
        statusCode: action.payload.statusCode,
      };

    case TRACK_SHIPMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case TRACK_SHIPMENT_RESET:
      return initialStateTrack;

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
