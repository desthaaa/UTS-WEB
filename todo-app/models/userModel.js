const db = require("../config/db"); //Menggunakan koneksi yang sudah diperbaiki
const bcrypt = require("bcryptjs");

const User = {
    create: async (username, password) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
            return result.insertId;  //Mengembalikan ID user yang baru dibuat
        } catch (error) {
            console.error("Error di User.create:", error);
            throw error;
        }
    },

    findByUsername: async (username) => {
        try {
            const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Error di User.findByUsername:", error);
            throw error;
        }
    }
};

module.exports = User;