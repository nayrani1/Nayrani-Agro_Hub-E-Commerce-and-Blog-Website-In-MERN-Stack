const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const errorMiddleWare = require("./middlewares/error");
const ProductRouter = require("./routes/ProductRoute");
const UserRouter = require("./routes/UserRoute");
const OrderRouter = require("./routes/orderRoute");
const BlogRouter = require("./routes/blogRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const PaymentRouter = require("./routes/PaymentRoute");
const ChatRouter = require("./routes/chatRoute");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.get("/", (req, res) => {
  res.send("Chat server is running");
});


// Set up a CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Products Routes
app.use("/api/v1", ProductRouter);
// Users Routes
app.use("/api/v1", UserRouter);
// Oreder Routes
app.use("/api/v1", OrderRouter);
// Blog Routes
app.use("/api/v1", BlogRouter);
// payment
app.use("/api/v1", PaymentRouter);
// chat
app.use("/api/v1", ChatRouter);

// error Handler
app.use(errorMiddleWare);

module.exports = { app, server }; // Export both app and server
