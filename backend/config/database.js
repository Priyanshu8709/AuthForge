const mongoose = require("mongoose");
require("dotenv").config();

let cached = global.__mongoose;
if (!cached) {
    cached = global.__mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(process.env.MONGODB_URI)
            .then((mongooseInstance) => mongooseInstance);
    }

    try {
        cached.conn = await cached.promise;
        console.log("MongoDB connected successfully");
        return cached.conn;
    } catch (err) {
        cached.promise = null;
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
};

module.exports = connectDB;
