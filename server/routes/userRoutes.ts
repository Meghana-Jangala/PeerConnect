import { Router } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

const router = Router();

// ✅ Signup (Register)
router.post("/signup", async (req, res) => {
  try {
    console.log("📩 Signup request body:", req.body);

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log("🔎 Checking if user exists:", existingUser);

    if (existingUser) {
      console.warn("⚠️ User already exists with email:", email);
      return res.status(400).json({ error: "User already exists" });
    }

    // 🚨 Don't hash here — model pre("save") handles it
    const user = new User({ name, email, password });

    await user.save();
    console.log("✅ User saved to DB with _id:", user._id);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Error during signup:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    console.log("📩 Login request body:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("🔎 User fetched from DB:", user);

    if (!user) {
      console.warn("⚠️ No user found with email:", email);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // ✅ Use comparePassword method from model
    const isMatch = await user.comparePassword(password);
    console.log("🔑 Password match status:", isMatch);

    if (!isMatch) {
      console.warn("⚠️ Invalid password attempt for email:", email);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    console.log("🎟️ JWT generated for user:", user._id);

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("❌ Error during login:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// ✅ Get all users (for testing only)
router.get("/", async (_req, res) => {
  try {
    console.log("📩 Fetching all users...");
    const users = await User.find().select("-password"); // hide passwords
    console.log("✅ Users fetched:", users.length);
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
});

export default router;
