const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mahasiswaRoutes = require("./routes/mahasiswaRoutes");
require("./config/database"); // Koneksi ke database

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.use("/mahasiswa", mahasiswaRoutes);

app.get("/", (req, res) => {
  res.redirect("/mahasiswa");
});

app.listen(3000, () => console.log("Server berjalan di http://localhost:3000"));
