const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./db/ConnectDB");
const bodyParser = require("body-parser");
const authController = require("./controllers/authController");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", authController);

// Start server
connectDb(() => {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`Listening to requests on PORT ${process.env.PORT}`);
  });
});
