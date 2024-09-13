const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
let { DB_URL } = process.env;

const connectDb = async (cb) => {
  mongoose
    .connect(DB_URL)
    .then((rep) => {
      if (rep.STATES.connected === 1) {
        console.log("Connection to Db was successful.");
        cb();
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = connectDb;
