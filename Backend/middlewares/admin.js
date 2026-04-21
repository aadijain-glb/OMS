const User = require("../models/user");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.role !== "admin")
    return res.status(403).json({ msg: "error" });

  next();
};
