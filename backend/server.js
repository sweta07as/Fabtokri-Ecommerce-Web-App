const fs = require("fs");
const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
const express = require("express");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
//const App = require("/home/ubuntu/FullStack-Ecommerce-WebApp/frontend/src/App");

//Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//config
dotenv.config({ path: "/home/ubuntu/FullStack-Ecommerce-WebApp/.env" });

//connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) =>
  res.sendFile(
    path.resolve(__dirname, "../", "frontend", "build", "index.html")
  )
);
//app.use("^/$", (req, res, next) => {
//  fs.readFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'), "utf-8", (err, data) => {
//    if (err) {
//      console.log(err);
//      return res.status(500).send("Some error happened");
//    }
//    return res.send(
//      data.replace(
//        '<div id="root"></div>',
//        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
//      )
//    );
//  });
//});

//app.use(express.static(path.join(__dirname, "../frontend/build")));

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
