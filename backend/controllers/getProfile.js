const User = require("../models/User");

exports.getProfile = async (req, res) => {
    try {

        // req.user is added by auth middleware
        const user = await User.findById(req.user.id).select("-password -otp -otpExpire");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
