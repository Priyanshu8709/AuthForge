const jwt = require("jsonwebtoken");

// bearer token middleware – expects Authorization header
module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log('auth middleware: missing or malformed authorization header', authHeader);
            return res.status(401).json({ message: "No token" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // contains at least { id }
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
