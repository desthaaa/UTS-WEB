const db = require("../config/db");

const util = require("util");
db.query = util.promisify(db.query).bind(db);
const Task = require("../models/taskModel");

exports.createTask = async (req, res) => {
    const { title, category, deadline } = req.body;
    const user_id = req.user?.userId; // Ambil user_id dari token (pastikan middleware autentikasi sudah ada)

    console.log("Data diterima dari frontend:", { title, category, deadline, user_id });

    if (!title || !category || !deadline || !user_id) {
        return res.status(400).json({ message: "Semua field harus diisi!" });
    }

    try {
        await db.query(
            "INSERT INTO tasks (title, category, deadline, user_id) VALUES (?, ?, ?, ?)",
            [title, category, deadline, user_id]
        );
        res.status(201).json({ message: "Task created successfully" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Gagal menyimpan tugas" });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const user_id = req.user?.userId; // Ambil user_id dari token yang sudah diverifikasi
        if (!user_id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Ambil hanya tugas milik user yang sedang login
        const rows = await db.query("SELECT * FROM tasks WHERE user_id = ?", [user_id]);

        console.log("Data tugas dari database untuk user_id:", user_id, rows); // Debugging
        res.json(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Gagal mengambil tugas" });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    console.log(`Mencoba menghapus tugas dengan ID: ${id}`); // Debugging

    try {
        // Panggil model Task.delete
        const result = await Task.delete(id);
        console.log(`Hasil penghapusan dari model Task: ${result}`); // Debugging

        if (!result) {
            return res.status(404).json({ message: "Tugas tidak ditemukan atau sudah dihapus!" });
        }

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