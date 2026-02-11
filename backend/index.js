const express = require('express');
const app = express();
app.set("trust proxy", 1);
const cookieParser = require("cookie-parser");
const cors = require("cors");

require('dotenv').config();
const PORT = process.env.PORT || 3000;  

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


const connectDB = require('./config/database');
connectDB();

//route import and mount
const user = require("./routes/user");
app.use("/api/v1", user);

app.get("/", (req,res)=>{
    res.send("Auth API running");
});

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})