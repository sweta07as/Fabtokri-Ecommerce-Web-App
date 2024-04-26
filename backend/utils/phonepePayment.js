const crypto = require("crypto");
const https = require("https");
const Order = require("../models/orderModel");

const checkStatusApi = async (transactionId) => {
  const merchantId = "FABTOKRIONLINE";
  // const merchantId = "PGTESTPAYUAT96";
  const merchantTransactionId = transactionId;
  // const merchantTransactionId = "MT7850590068188104";

  const saltIndex = process.env.PhonepekeyIndex;
  const saltKey = process.env.Phonepekey;

  const concatenatedString = `/pg/v1/status/${merchantId}/${merchantTransactionId}${saltKey}`;

  const sha256Hash = crypto
    .createHash("sha256")
    .update(concatenatedString)
    .digest("hex");

  const finalChecksum = `${sha256Hash}###${saltIndex}`;

  // console.log(finalChecksum);

  // const url = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`;
  const url = `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`; //for prod

  const headers = {
    "Content-Type": "application/json",
    "X-VERIFY": `${finalChecksum}`,
    "X-MERCHANT-ID": "FABTOKRIONLINE",
    Accept: "application/json",
  };

  const responseData = await makeHttpGetRequest(url, headers);

  // console.log("Check API Response data:", responseData);

  const response = JSON.parse(responseData);

  // console.log("Check API Response:", response);

  const statusCode = response.code;

  const order = await Order.findOne({
    "paymentInfo.id": merchantTransactionId,
  });

  if (statusCode === "PAYMENT_SUCCESS") {
    order.paymentInfo.status = "succeeded";
  } else if (
    statusCode === "PAYMENT_PENDING" ||
    statusCode === "INTERNAL_SERVER_ERROR"
  ) {
    order.paymentInfo.status = "pending";
  } else if (
    statusCode === "BAD_REQUEST" ||
    statusCode === "AUTHORIZATION_FAILED" ||
    statusCode === "PAYMENT_ERROR" ||
    statusCode === "TRANSACTION_NOT_FOUND" ||
    statusCode === "PAYMENT_DECLINED" ||
    statusCode === "TIMED_OUT"
  ) {
    order.paymentInfo.status = "failed";
  }

  // console.log(order);

  await order.save({ validateBeforeSave: false });

  return {
    response,
    statusCode,
    order,
  };
};

// Function to make an HTTP GET request with options
function makeHttpGetRequest(url, headers) {
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

module.exports = checkStatusApi;
