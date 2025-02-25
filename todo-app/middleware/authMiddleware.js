// const { verifyToken } = require("../config/auth");

// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Access denied" });

//   try {
//     const decoded = verifyToken(token);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: "Invalid token" });
//   }
// };

// console.log("Token:", token);

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // mengambil token dari header Authorization
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]; // ambil token setelah "Bearer "
    }

    // debugging: mengecek apakah token ada atau tidak
    console.log("Token:", token);

    if (!token) {
        return res.status(401).json({ message: "Akses ditolak, token tidak ditemukan!" });
    }

    try {
        // verifikasi token
        const decoded = jwt.verify(token, "RAHASIA_SECRET"); // ganti dengan secret yang benar
        req.user = decoded; // simpan data user di request
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token tidak valid!" });
    }
};

module.exports = authMiddleware;
