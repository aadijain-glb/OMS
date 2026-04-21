const express = require("express");
const app = express();

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Server Error"
  });
};

app.use(errorHandler);
module.exports = app;

