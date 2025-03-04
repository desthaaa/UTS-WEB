const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authController = {
    register: (req, res) => {
        const { username, password } = req.body;

        // Cek apakah username sudah digunakan
        User.findByUsername(username)
            .then(existingUser => {
                if (existingUser) {
                    return res.status(400).json({ message: "Username sudah digunakan!" });
                }

                // Jika username belum ada, buat user baru
                User.create(username, password)
                    .then(userId => {
                        return res.status(201).json({ message: "Registrasi berhasil!", userId });
                    })
                    .catch(err => {
                        console.error("Error saat registrasi:", err);
                        res.status(500).json({ message: "Registrasi gagal!" });
                    });
            })
            .catch(err => {
                console.error("Error saat mengecek username:", err);
                res.status(500).json({ message: "Terjadi kesalahan pada server!" });
            });
    },

    login: (req, res) => {
        const { username, password } = req.body;

        User.findByUsername(username)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: "User tidak ditemukan!" });
                }

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err || !isMatch) {
                        return res.status(400).json({ message: "Password salah!" });
                    }

                    const token = jwt.sign({ userId: user.id }, "SECRET_KEY", { expiresIn: "1h" });
                    res.json({ token });
                });
            })
            .catch(err => {
                console.error("Error saat login:", err);
                res.status(500).json({ message: "Terjadi kesalahan pada server!" });
            });
    }
};

module.exports = authController;