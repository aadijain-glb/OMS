const SecurityLog = require("../models/SecurityLog");

const logSecurityEvent = async ({
  action,
  performedBy,
  targetUser,
  req
}) => {
  try {
    await SecurityLog.create({
      action,
      performedBy,
      targetUser,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"]
    });
  } catch (err) {
    console.error("Security log failed:", err.message);
  }
};

module.exports = logSecurityEvent;