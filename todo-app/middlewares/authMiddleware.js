import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // ✅ Ambil token
    console.log("Extracted Token:", token); // ✅ Debugging

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // ✅ Debugging
        req.user = decoded; // ✅ Simpan user ke req
        console.log("Middleware - req.user:", req.user);
        next();
    } catch (error) {
        console.error("Invalid token:", error);
        res.status(403).json({ message: "Invalid token" });
    }
};


export default authMiddleware;