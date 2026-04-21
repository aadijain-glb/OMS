const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const logSecurityEvent = require("../utils/logSecurityEvent");


exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Email & password required" });
        }
        if (!email.includes("@")) {
            return res.status(400).json({ msg: "Invalid email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ msg: "Password too short" });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hash });
        res.json({ message: "Signup successful. Please login" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "No user Found, signup required" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: "Password Incorrect" });
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({
            message: "Login Successfull", user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.deleteMe = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            path: "/",
        });

        return res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};


exports.logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            path: "/",
        });
        return res.json({ message: "Logout successful" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

exports.deleteUserByAdmin = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ message: "User deleted successfully by Admin" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isBlocked) {
            return res.status(400).json({ message: "User is blocked" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        user.resetPasswordExpire = Date.now() + 3600000;
        await user.save();

        const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken}`;

        try {
            // Configure nodemailer transporter
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || "smtp.mailtrap.io",
                port: process.env.SMTP_PORT || 2525,
                auth: {
                    user: process.env.SMTP_EMAIL,
                    pass: process.env.SMTP_PASSWORD
                }
            });

            const message = {
                from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
                to: user.email,
                subject: "Password Reset Request",
                html: `<p>You requested a password reset. Please click <a href="${resetUrl}">here</a> to reset your password or copy and paste the link below:</p><br/> <a href="${resetUrl}">${resetUrl}</a>`
            };

            await transporter.sendMail(message);
            console.log(`Password reset link sent to: ${user.email}`);
        } catch (error) {
            console.error("Email sending failed:", error);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            return res.status(500).json({ message: "Email could not be sent" });
        }

        return res.json({ message: "Password reset email sent", resetUrl });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { resetToken } = req.params;
        const { password } = req.body;
        const user = await User.findOne({
            resetPasswordToken: crypto.createHash("sha256").update(resetToken).digest("hex"),
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        if (user.isBlocked) {
            return res.status(403).json({ message: "User is blocked" });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        user.passwordChangedAt = new Date();
        await user.save();

        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/"
        });

        return res.json({ message: "Password reset successful" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { oldpassword, newpassword } = req.body;
        if (!oldpassword || !newpassword) {
            return res.status(400).json({ message: "Old password and new password required" });
        }
        if (newpassword.length < 6) {
            return res.status(400).json({ message: "New password must be at least 6 characters long" });
        }
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isBlocked) {
            return res.status(400).json({ message: "User is blocked" });
        }

        const isMatch = await bcrypt.compare(oldpassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        user.password = await bcrypt.hash(newpassword, 10);
        user.passwordChangedAt = new Date();

        await logSecurityEvent({
            action: "CHANGE_PASSWORD",
            performedBy: req.user.id,
            targetUser: req.user.id,
            req
        });


        await user.save();
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/"
        });

        return res.json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}