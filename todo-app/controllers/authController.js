import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";  // ✅ Tambahkan .js di akhir path

const authController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const userId = await User.create(username, password);
      const token = jwt.sign({ userId }, "SECRET_KEY", { expiresIn: "1h" });
      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ message: "Registration failed" });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findByUsername(username);
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ userId: user.id }, "SECRET_KEY", { expiresIn: "1h" });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: "Login failed" });
    }
  }
};

export default authController;  // ✅ Pastikan diekspor dengan `export default`
