const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db;

// **Buka koneksi ke MongoDB sekali saat server dimulai**
async function connectDB() {
  try {
    await client.connect();
    db = client.db("testdb");
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit jika gagal koneksi
  }
}

// **Ambil semua produk**
app.get("/products", async (req, res) => {
  try {
    const products = await db.collection("products").find().toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// **Tambahkan produk baru (1 atau lebih sekaligus)**
app.post("/products", async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      const { name, price } = req.body;
      if (!name || !price) return res.status(400).json({ error: "Name and price are required!" });

      await db.collection("products").insertOne({ name, price });
      return res.json({ message: "Product added!" });
    }

    // Jika data berbentuk array, tambahkan banyak produk sekaligus
    const products = req.body.filter((p) => p.name && p.price);
    if (products.length === 0) return res.status(400).json({ error: "Invalid data format!" });

    await db.collection("products").insertMany(products);
    res.json({ message: `${products.length} products added!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// **Jalankan server setelah koneksi berhasil**
connectDB().then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});
