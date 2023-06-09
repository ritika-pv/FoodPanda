const app = require("./app");
const env = require("dotenv");
const connectDatabase = require("./config/database");
const Razorpay = require("razorpay");

//config
env.config({ path: "config/config.env" });

//connectingDb
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on ${process.env.PORT}`);
});

//checking if smtp is connected or not

// const net = require('net');

// const serverAddress = 'smtp.gmail.com';
// const serverPort = 587;

// const client = net.createConnection({ port: serverPort, host: serverAddress }, () => {
//   console.log(`Connected to ${serverAddress}:${serverPort}`);
// });

// client.on('error', (err) => {
//   console.error(`Error connecting to ${serverAddress}:${serverPort}: ${err.message}`);
// });

// client.on('end', () => {
//   console.log(`Disconnected from ${serverAddress}:${serverPort}`);
// });

//Unhandled Promise Rejection
//server band ho jayega faltu load nahi lega sending load load load .....no ab ye nahi hoga
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down server due to unhandeled promise rejection");
  server.close(() => {
    process.exit();
  });
});

//Razorpay instance
exports.instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
});
