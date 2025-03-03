const Task = require("../models/taskModel");

const taskController = {
  createTask: async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;
    try {
      const taskId = await Task.create(userId, title, description);
      res.status(201).json({ taskId });
    } catch (err) {
      res.status(500).json({ message: "Task creation failed" });
    }
  },
  getTasks: async (req, res) => {
    const userId = req.user.id;
    try {
      const tasks = await Task.findAllByUserId(userId);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  },
  updateTask: async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
      await Task.update(id, title, description, completed);
      res.json({ message: "Task updated" });
    } catch (err) {
      res.status(500).json({ message: "Task update failed" });
    }
  },
  deleteTask: async (req, res) => {
    const { id } = req.params;
    try {
      await Task.delete(id);
      res.json({ message: "Task deleted" });
    } catch (err) {
      res.status(500).json({ message: "Task deletion failed" });
    }
  },
};

exports.getTasks = (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: "Database error" });
      }
      res.json(results);
  });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: "Gagal menghapus tugas" });
      }
      res.json({ message: "Tugas berhasil dihapus" });
  });
};
exports.createTask = (req, res) => {
  console.log("Request body:", req.body);  // Log request data
  console.log("User ID:", req.user.id);  // Log user ID dari JWT

  const { title, category, deadline } = req.body;
  const userId = req.user.id;  // ID pengguna dari JWT

  if (!title || !category || !deadline) {
      return res.status(400).json({ message: "Semua field harus diisi!" });
  }

  const query = "INSERT INTO tasks (user_id, title, category, deadline) VALUES (?, ?, ?, ?)";
  db.query(query, [userId, title, category, deadline], (err, result) => {
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Gagal menyimpan tugas" });
      }
      res.status(201).json({ message: "Task created successfully", taskId: result.insertId });
  });
};
module.exports = taskController;