import db from "../config/db.js";

const taskController = {
    createTask: async (req, res) => {
        const { title, category, deadline } = req.body;
        const user_id = req.user?.userId; // Sesuai dengan token yang di-decode

        console.log("Menerima request tambah tugas:");
        console.log("Title:", title);
        console.log("Category:", category);
        console.log("Deadline:", deadline);
        console.log("User ID:", user_id); //Debugging
        console.log("Task Controller - User ID:", user_id);

        if (!title || !category || !deadline) {
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }

        if (!user_id) {
            return res.status(401).json({ message: "User tidak ditemukan, pastikan login dengan benar" });
        }

        try {
            db.query("INSERT INTO tasks (title, category, deadline, user_id) VALUES (?, ?, ?, ?)", 
            [title, category, deadline, user_id], 
            (err, result) => {
        if (err) {
            console.error("Error saat menambahkan tugas:", err);
            return res.status(500).json({ message: "Gagal menambahkan tugas" });
        }
        res.status(201).json({ message: "Tugas berhasil ditambahkan" });
    }
);

            res.status(201).json({ message: "Tugas berhasil ditambahkan" });
        } catch (error) {
            console.error("Error saat menambahkan tugas:", error);
            res.status(500).json({ message: "Gagal menambahkan tugas" });
        }
    },

    getTasks: async (req, res) => {
        const user_id = req.user?.userId; // Sesuai dengan token yang di-decode
        console.log("Mengambil tugas untuk user ID:", user_id); //Debugging
        try {
            const [tasks] = await db.query("SELECT * FROM tasks WHERE user_id = ?", [user_id]);
            console.log("Data tugas dari database:", tasks); //Debugging
            res.json(tasks);
        } catch (error) {
            console.error("Error mengambil tugas:", error);
            res.status(500).json({ message: "Gagal mengambil tugas" });
        }
    },

    updateTask: async (req, res) => {
        const { title, category, deadline } = req.body;
        const { id } = req.params;
        console.log(`Memperbarui tugas ID ${id}:`, title, category, deadline); //Debugging

        try {
            await db.query("UPDATE tasks SET title = ?, category = ?, deadline = ? WHERE id = ?", [title, category, deadline, id]);
            res.json({ message: "Tugas berhasil diperbarui" });
        } catch (error) {
            console.error("Error saat memperbarui tugas:", error);
            res.status(500).json({ message: "Gagal memperbarui tugas" });
        }
    },

    deleteTask: async (req, res) => {
        const { id } = req.params;
        console.log("Menghapus tugas ID:", id); //Debugging
        try {
            await db.query("DELETE FROM tasks WHERE id = ?", [id]);
            res.json({ message: "Tugas berhasil dihapus" });
        } catch (error) {
            console.error("Error saat menghapus tugas:", error);
            res.status(500).json({ message: "Gagal menghapus tugas" });
        }
    }
};

export default taskController;