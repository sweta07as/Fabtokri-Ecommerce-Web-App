const https = require("https");
const ErrorHandler = require("../utils/errorHandler");
const asyncError = require("../middleware/asyncError");
const { log } = require("console");

// Function to check Delhivery serviceability for a pincode
exports.checkPincode = asyncError(async (req, res, next) => {
  const { pinCode } = req.query;
  // const pinCode = 122002;
const apiToken = process.env.DELHIVERY_API_TOKEN;
  // const url = `https://staging-express.delhivery.com/c/api/pin-codes/json/?filter_codes=${pinCode}`;
  const url = `https://track.delhivery.com/c/api/pin-codes/json/?filter_codes=${pinCode}`;

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Token ${apiToken}`,
  };


  // Make a request to the Delhivery API to check serviceability
  // const response = await makeHttpRequest(url, headersJSON);
  const response = await makeHttpRequest(url, headers);


  const serviceability = JSON.parse(response);

  const prepaid = serviceability.delivery_codes.every((deliveryCode) => {
    return deliveryCode.postal_code.pre_paid === "Y";
  });

  // const cod = serviceability.delivery_codes.every((deliveryCode) => {
  //   return deliveryCode.postal_code.cod === "Y";
  // });

  // Check the response for "NSZ" to determine serviceability //LEFT TO BE CODED

  if (!serviceability.delivery_codes.length || !prepaid) {
    return next(new ErrorHandler("Pincode is not serviceable.", 404));
  }

  // Handle other serviceability data as needed

  // Return the serviceability data
  res.status(200).json({
    success: true,
    prepaid,
    serviceability,
  });
});

// Function to make an HTTP GET request with options
function makeHttpRequest(url, headers) {
  return new Promise((resolve, reject) => {
    const options = {
      // method: "GET",
      headers: headers,
      followRedirect: true, //added for prod
    };

    https.get(url, options, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        resolve(data);
      });

      response.on("error", (error) => {
        // Use response.on for error handling
        reject(error);
      });
    });
  });
}

exports.trackShipment = asyncError(async (req, res, next) => {
  const { waybill } = req.query;

  // const waybill = 6578110000114;

  // const orderid = "649dcee992ee04e94750b751";

  // const url = `https://staging-express.delhivery.com/api/v1/packages/json/?waybill=${waybill}`;
  const url = `https://track.delhivery.com/api/v1/packages/json/?waybill=${waybill}&ref_ids=`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${apiToken}`,
  };

  // Make a request to the Delhivery API to check serviceability
  const response = await makeHttpRequest(url, headers);

  const shipmentData = JSON.parse(response);

  const shipmentStatus = shipmentData.ShipmentData[0].Shipment.Status.Status;
  const statusLocation =
    shipmentData.ShipmentData[0].Shipment.Status.StatusLocation;

  const statusDateTime =
    shipmentData.ShipmentData[0].Shipment.Status.StatusDateTime;

  const statusType = shipmentData.ShipmentData[0].Shipment.Status.StatusType;

  const statusCode = shipmentData.ShipmentData[0].Shipment.Status.StatusCode;

  // console.log(status);

  if (
    !shipmentData ||
    !shipmentData.ShipmentData ||
    shipmentData.ShipmentData.length === 0
  ) {
    return next(new ErrorHandler("No waybill or order id found", 404));
  }

  // Return the serviceability data
  res.status(200).json({
    success: true,
    shipmentStatus,
    statusLocation,
    statusDateTime,
    statusType,
    statusCode,
  });
});
