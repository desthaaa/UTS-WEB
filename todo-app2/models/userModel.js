const db = require("../config/db"); // ✅ Gunakan require()
const bcrypt = require("bcryptjs");

const User = {
    create: (username, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return reject(err);

                db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], (error, result) => {
                    if (error) return reject(error);
                    resolve(result.insertId);
                });
            });
        });
    },

    findByUsername: (username) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE username = ?", [username], (error, rows) => {
                if (error) return reject(error);
                resolve(rows.length > 0 ? rows[0] : null);
            });
        });
    }
};

module.exports = User;