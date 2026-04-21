const rateLimit = require("express-rate-limit");

const forgotPasswordLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 6,                 // max 6 requests
  message: "Too many password reset attempts. Try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = forgotPasswordLimiter;
