const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateTask = require("../middlewares/taskMiddleware");

router.use(authMiddleware);

router.get('/tasklist', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/tasklist.html'));
});

router.post("/", validateTask, taskController.createTask);
// router.put("/:id", validateTask, taskController.updateTask);

router.post("/", taskController.createTask);
router.get("/", authMiddleware, taskController.getTasks);
router.delete("/:id", authMiddleware, taskController.deleteTask);
router.put("/:id", authMiddleware, taskController.updateTask);

module.exports = router;