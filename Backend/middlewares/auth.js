const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: "Login required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    if (user.isBlocked) {
      return res.status(403).json({ msg: "Your account is blocked" });
    }
    if (
      user.passwordChangedAt &&
      decoded.iat * 1000 < user.passwordChangedAt.getTime()
    ) {
      return res.status(401).json({
        msg: "Password changed. Please login again."
      });
    }

    req.user = { id: user._id, role: user.role };
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};
