const express = require("express");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/tasks", taskController.createTask); //posting tasks
router.get("/tasks", taskController.getTasks); //mengambil tasks
router.put("/tasks/:id", taskController.updateTask); //memasukkan tasks
router.delete("/tasks/:id", taskController.deleteTask); //menghapus tasks

module.exports = router;
