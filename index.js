//@Date: 31/09/2022
//@Author: Shipon islam

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

//env file setup
require("dotenv").config();
//connect mongodb
require("./db/mongoDB");
//external import
const userRouter = require("./Routes/usersRoute");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandle");
const productRouter = require("./Routes/productRoute");
const paymentRoutes = require("./Routes/paymentRoutes");
//port setup
const PORT = process.env.PORT || 5000;

//parse body setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors(corsOptions));

//cors setup manualy because cors pakages not working
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://sellbd.onrender.com"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", paymentRoutes);
app.use(express.static(path.join(__dirname, "/public")));

//handling err
app.use(notFoundHandler);
app.use(errorHandler);
//application listen setup
app.listen(PORT, () =>
  console.log(`server running on port http://localhost:${PORT}`)
);
