const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const user = await User.findByUsername(email); // Gunakan fungsi yang tersedia di userModel.js

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Email atau password salah" });
    }

    const token = jwt.sign({ userId: user.id }, "SECRET_KEY", { expiresIn: "1h" });
    res.json({ token });
};

const register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create(username, hashedPassword);

    res.status(201).json({ message: "User berhasil didaftarkan" });
};

module.exports = { login, register };