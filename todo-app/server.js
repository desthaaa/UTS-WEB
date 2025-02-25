const express = require("express");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const Task = require ("./models/taskModel");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.set("views", path.join(__dirname, "views")); 
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get("/", async (req, res) => {
  res.redirect("/auth/login");
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
