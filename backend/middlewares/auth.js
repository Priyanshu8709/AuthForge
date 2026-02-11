const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
    try {
        let token;

        if (req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: "Not authorized. Please login." 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("password");

        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: "User not found" 
            });
        }

        // attach user to request
        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
