const express = require('express');
const app = express();
app.set("trust proxy", 1);
const cookieParser = require("cookie-parser");
const cors = require("cors");

require('dotenv').config();
const PORT = process.env.PORT || 3000;  
const defaultOrigins = ["http://localhost:5173"];
const envOrigins = (process.env.CLIENT_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));


const connectDB = require('./config/database');
connectDB();

//route import and mount
const user = require("./routes/user");
app.use("/api/v1", user);

app.get("/", (req,res)=>{
    res.send("Auth API running");
});

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`App is listening at ${PORT}`);
    });
}

module.exports = app;
