const { app, server } = require("./app"); // Import both app and server
const dotenv = require("dotenv");
dotenv.config({ path: "BackEnd/config/.env" });
const DatabaseConnect = require("./config/Database");
const cloudinary = require('cloudinary')
// Handle Uncaught Exceptions
process.on('uncaughtException', err => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting Down the server due to uncaught Exception")
  console.log(`Stack: ${err.stack}`)
  server.close(() => {
    process.exit(1)
  });
});
// connecting with Database 
DatabaseConnect();
// setting up cloudinay configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
//Starting The Development Server
const port = process.env.PORT || 4040;
const env = process.env.NODE_ENV;

server.listen(port, () => {
  console.log(
    `Express Server is running on port= http://localhost:${port} in ${env} Mode`
  );
});

// handling UnHandled Promice Rejection
process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`)
  console.log("Shutting Down the Server Due To Unhandled promice Rejection")
  server.close(() => {
    process.exit(1);
  });
});
