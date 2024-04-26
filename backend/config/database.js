const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDatabase = () => {
  return mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
};

module.exports = connectDatabase;
