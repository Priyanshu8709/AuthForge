const express = require('express');
const app = express();
app.set("trust proxy", 1);
const cookieParser = require("cookie-parser");
const cors = require("cors");

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const normalizeOrigin = (value) => {
    if (!value) {
        return value;
    }
    return value.trim().replace(/\/$/, "");
};

const defaultOrigins = ["http://localhost:5173"].map(normalizeOrigin);
const envOrigins = (process.env.CLIENT_URL || "")
    .split(",")
    .map(normalizeOrigin)
    .filter(Boolean);
const allowedOrigins = new Set([...defaultOrigins, ...envOrigins]);

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: (origin, callback) => {
        const normalizedOrigin = normalizeOrigin(origin);
        if (!normalizedOrigin || allowedOrigins.has(normalizedOrigin)) {
            return callback(null, true);
        }
        console.warn(`CORS blocked origin: ${normalizedOrigin}`);
        return callback(null, false);
    },
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));


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
