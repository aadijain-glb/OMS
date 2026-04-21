const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const logSecurityEvent = require("../utils/logSecurityEvent");
const SecurityLog = require("../models/SecurityLog");

//For already logged in user ------------>


exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found, Signup required" });
    res.json({
      id: user._id,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};



exports.updateProfile = async (req, res) => {
  try {
    const { name, email, newPassword, oldPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found, Signup required" });

    if (name) user.name = name;


    if (email && email !== user.email) {
      const emailexist = await User.findOne({ email });
      if (emailexist) return res.status(400).json({ msg: "Email already exists" });
      user.email = email;
    }


    if (newPassword) {
      if (!oldPassword) {
        return res.status(400).json({ msg: "Old password required" });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Old password is incorrect" });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ msg: "New password must be at least 6 characters long" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }
    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments();
    res.json({ page, limit, totalUsers, totalPages: Math.ceil(totalUsers / limit), users });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

exports.getUserById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

exports.blockUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    if (user.isBlocked) {
      return res.status(400).json({ msg: "User is already blocked" });
    }
    user.isBlocked = true;
    user.blockedAt = new Date();

    await logSecurityEvent({
      action: "BLOCK_USER",
      performedBy: req.user.id,
      targetUser: user._id,
      req
    });

    await user.save();
    res.json({ msg: "User blocked successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

exports.unblockUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    if (!user.isBlocked) {
      return res.status(400).json({ msg: "User is not blocked" });
    }

    user.isBlocked = false;
    user.blockedAt = null;
    await user.save();
    res.json({ msg: "User unblocked successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

exports.updateRole = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ msg: "Invalid role" });
    }

    if (req.user.id.toString() === req.params.id) {
      return res.status(400).json({ msg: "Admin cannot change own role" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.isBlocked) {
      return res.status(400).json({ msg: "Blocked user role cannot be changed" });
    }
    if (user.role === role) {
      return res.status(400).json({ msg: `User role is already ${role}` });
    }
    user.role = role;


    await logSecurityEvent({
      action: "CHANGE_ROLE",
      performedBy: req.user.id,
      targetUser: user._id,
      req
    });

    await user.save();
    res.json({ msg: `User role updated successfully to ${role}` });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

exports.getSecurityLogs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const logs = await SecurityLog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalLogs = await SecurityLog.countDocuments();

    res.json({
      page,
      limit,
      totalLogs,
      logs
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
