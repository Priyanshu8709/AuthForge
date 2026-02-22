const User = require("../models/User");
const jwt = require("jsonwebtoken");
const generateOTP = require("../utils/generateOTP");
const sendMail = require("../utils/sendMail");

const isProd = process.env.NODE_ENV === "production";
const cookieOptions = {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
    path: "/",
};

// SIGNUP
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        const user = await User.create({
            name,
            email,
            password
        });

       const otp = generateOTP();

        user.otp = otp;
        user.otpExpire = Date.now() + 5 * 60 * 1000;

        await user.save();

        await sendMail(user.email, otp);

        res.status(200).json({
            success:true,
            message:"OTP sent to your email"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.verifySignupOTP = async (req,res)=>{
    try{
        const {email, otp} = req.body;

        const user = await User.findOne({email});

        if(!user || user.otp !== otp || user.otpExpire < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Invalid or expired OTP"
            });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpire = null;

        await user.save();

        res.json({
            success:true,
            message:"Account verified successfully"
        });

    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
};


// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        if (!user.isVerified) {
            return res.status(401).json({
                success: false,
                message: "Please verify your email first"
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const otp = generateOTP();

        user.otp = otp;
        user.otpExpire = Date.now() + 5 * 60 * 1000; // 5 minutes
        await user.save();

        
        await sendMail(user.email, otp);

        res.status(200).json({
            success: true,
            message: "OTP sent to your email"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.verifyLoginOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }

        // OTP validation
        if (user.otp !== otp || user.otpExpire < Date.now()) {
            return res.status(400).json({
                success:false,
                message:"Invalid or expired OTP"
            });
        }

        // create JWT AFTER OTP success
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // send cookie
        res.cookie("token", token, {
            ...cookieOptions,
        });

        // clear otp
        user.otp = null;
        user.otpExpire = null;
        await user.save();

        res.status(200).json({
            success:true,
            message:"Login successful"
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            ...cookieOptions,
        });

        res.cookie("token", "", {
            ...cookieOptions,
            expires: new Date(0)
        });

        res.status(200).json({
            success: true,
            message: "Logged out"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
