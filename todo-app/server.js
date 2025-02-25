const express = require("express");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const Task = require ("./models/taskModel");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.set("view engine", "ejs"); // memakai ejs
app.set("views", path.join(__dirname, "views")); 
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

app.get("/", async (req, res) => {
  try {
      const tasks = await Task.findAll(); // ambil semua tugas
      res.render("index", { tasks });
  } catch (error) {
      res.status(500).send("Gagal mengambil data tugas");
  }
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
