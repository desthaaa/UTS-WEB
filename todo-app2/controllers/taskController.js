const db = require("../config/db");

exports.createTask = async (req, res) => {
    const { title, category, deadline } = req.body;
    console.log(" Data yang diterima dari frontend:", req.body);

    console.log("Data diterima dari frontend:", { title, category, deadline }); // Debugging

    if (!title || !category || !deadline) {
        return res.status(400).json({ message: "Semua field harus diisi!" });
    }

    try {
        await db.query("INSERT INTO tasks (title, category, deadline) VALUES (?, ?, ?)", [title, category, deadline]);
        res.status(201).json({ message: "Task created successfully" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Gagal menyimpan tugas" });
    }
};

exports.getTasks = async (req, res) => {
  try {
      const [rows] = await db.query("SELECT * FROM tasks");
      console.log(" Data tugas dari database:", rows); // Debugging
      res.json(rows);
  } catch (err) {
      console.error(" Database error:", err);
      res.status(500).json({ message: "Gagal mengambil tugas" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
      await db.query("DELETE FROM tasks WHERE id = ?", [id]);
      res.json({ message: "Tugas berhasil dihapus" });
  } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ message: "Gagal menghapus tugas" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, category, deadline } = req.body;

  console.log("Update Task:", { id, title, category, deadline }); // Debugging

  if (!title || !category || !deadline) {
      return res.status(400).json({ message: "Semua field harus diisi!" });
  }

  try {
      const [result] = await db.query(
          "UPDATE tasks SET title = ?, category = ?, deadline = ? WHERE id = ?",
          [title, category, deadline, id]
      );

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Tugas tidak ditemukan!" });
      }

      res.json({ message: "Task updated successfully" });
  } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ message: "Gagal memperbarui tugas" });
  }
};

exports.createTask = async (req, res) => {
  const { title, category, deadline } = req.body;

  console.log(" Data dari frontend:", { title, category, deadline });  //  Debugging

  if (!title || !category || !deadline) {
      console.log(" Data tidak lengkap!");
      return res.status(400).json({ message: "Semua field harus diisi!" });
  }

  try {
      await db.query("INSERT INTO tasks (title, category, deadline) VALUES (?, ?, ?)", [title, category, deadline]);
      console.log(" Data berhasil disimpan ke database!");
      res.status(201).json({ message: "Task created successfully" });
  } catch (err) {
      console.error(" Database error:", err);
      res.status(500).json({ message: "Gagal menyimpan tugas" });
  }
};