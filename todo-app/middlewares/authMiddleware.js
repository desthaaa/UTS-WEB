// const { verifyToken } = require("../config/auth");
// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token){
//     return res.status(401).json({ message: "Access denied" });
//   }
//   try {
//     const decoded = jwt.verifyToken(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader); // 🔍 Debugging

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Ambil token setelah "Bearer"

    try {
        console.log("Extracted Token:", token); // 🔍 Debugging
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // 🔍 Debugging
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Error:", error.message); // 🔍 Debugging
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;