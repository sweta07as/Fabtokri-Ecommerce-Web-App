const asyncError = require("../middleware/asyncError");
const crypto = require("crypto");
const https = require("https");
const Payment = require("../models/paymentModel");
const { log } = require("console");
const Order = require("../models/orderModel");

//PAY API
exports.checkout = asyncError(async (req, res, next) => {
  const payload = {
    merchantId: "FABTOKRIONLINE",
    // merchantId: "PGTESTPAYUAT96",
    // merchantTransactionId: "MT7850590068188104",
    merchantTransactionId: `MT${Date.now()}${Math.random()
      .toString(36)
      .substring(2, 10)}`,

    // merchantUserId: req.body.userId,
    merchantUserId: `MUID${Date.now()}${Math.random()
      .toString(36)
      .substring(2, 6)}`,

    amount: Number(req.body.amount * 100),
    // amount: 10000,
    // redirectUrl: "http://localhost:3000/paymentsuccess",
    redirectUrl: "https://www.fabtokri.in/paymentsuccess",
    redirectMode: "REDIRECT",
    // callbackUrl: "http://localhost:4000/api/v1/paymentverification", //not in use in staging or prod
    // callbackUrl: "http://localhost:3000/callback",
    callbackUrl: "https://www.fabtokri.in/callback",
    mobileNumber: "8969963531",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const payloadString = JSON.stringify(payload);
  const base64Payload = Buffer.from(payloadString).toString("base64");

  // console.log(base64Payload);

  const saltIndex = process.env.PhonepekeyIndex;
  const saltKey = process.env.Phonepekey;

  const concatenatedString = `${base64Payload}/pg/v1/pay${saltKey}`;

  const sha256Hash = crypto
    .createHash("sha256")
    .update(concatenatedString)
    .digest("hex");

  const finalChecksum = `${sha256Hash}###${saltIndex}`;

  // console.log(finalChecksum);

  // const url = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
  const url = "https://api.phonepe.com/apis/hermes/pg/v1/pay"; //for prod

  const headers = {
    "Content-Type": "application/json",
    "X-VERIFY": `${finalChecksum}`,
    Accept: "application/json",
  };

  const responseData = await makeHttpPostRequest(url, headers, base64Payload);

  // console.log("Pay API Response data:", responseData);

  const response = JSON.parse(responseData);

  // console.log("Pay API Response:", response);

  const responseUrl = response.data.instrumentResponse.redirectInfo.url;
  const responseCode = response.code;
  const transactionId = response.data.merchantTransactionId;

  res.status(200).json({
    response,
    responseCode,
    responseUrl,
    transactionId,
  });
});

//CHECK STATUS API
exports.paymentVerification = asyncError(async (req, res) => {
  const merchantId = "FABTOKRIONLINE";
  // const merchantId = "PGTESTPAYUAT96";
  const merchantTransactionId = req.params.transactionId;
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

  const order = await Order.findOne({ "paymentInfo.id": merchantTransactionId});
  
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

  res.status(200).json({
    response,
    statusCode,
    order,
  });
});

function makeHttpPostRequest(url, headers, payload) {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      headers: headers,
      // headers: JSON.stringify(headers), //added for prod
      followRedirect: true, //added for prod
    };

    const req = https.request(url, options, (response) => {
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

    // Send the payload in the request body
    req.write(JSON.stringify({ request: payload }));

    req.end();
  });
}

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
