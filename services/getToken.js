const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
let { JWT_SECRET } = process.env;

module.exports.getToken = (data, exp) =>
  new Promise(function (accept, reject) {
    jwt.sign(data, JWT_SECRET, { expiresIn: exp }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        accept(token);
      }
    });
  });
