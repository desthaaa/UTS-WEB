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

const express = require("express");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// ke halaman login
app.get("/", (req, res) => {
    res.redirect("/login");
});

// login.html dan register.html bisa diakses
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

app._router.stack.forEach(function (r) {
  if (r.route && r.route.path) {
      console.log(r.route.path);
  }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});