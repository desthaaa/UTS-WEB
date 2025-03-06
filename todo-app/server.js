// const express = require("express");
// const authRoutes = require("./routes/authRoutes");
// const taskRoutes = require("./routes/taskRoutes");
// const path = require("path");
// require("dotenv").config();

// const app = express();
// const port = process.env.PORT || 4000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); 
// app.use(express.static(path.join(__dirname, "public")));

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// app.use("/auth", authRoutes);
// app.use("/tasks", taskRoutes);

// app.get("/", (req, res) => {
//   res.redirect("/login");
// });

// app.get("/login", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "login.html"));
// });

// app.get("/register", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "register.html"));
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import db from "./config/db.js"; // Pastikan ini sudah ada

// Konversi __dirname untuk ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routing API
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Routing untuk halaman
app.get("/", (req, res) => res.redirect("/login"));
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));
app.get("/homepage", (req, res) => res.render("homepage"));

app.get("/tasklist", async (req, res) => {
    try {
        const [tasks] = await db.query("SELECT * FROM tasks");
        res.render("tasklist", { tasks });
    } catch (error) {
        console.error("Error mengambil tugas:", error);
        res.status(500).send("Terjadi kesalahan saat mengambil tugas.");
    }
});

// Jalankan server
app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
});