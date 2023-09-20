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
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

//parse body setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

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
