const express = require("express");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateTask = require("../middlewares/taskMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateTask, taskController.createTask);
router.put("/:id", validateTask, taskController.updateTask);

router.post("/", taskController.createTask);
router.get("/", authMiddleware, taskController.getTasks);
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;