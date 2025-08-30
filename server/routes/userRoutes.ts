import { Router } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { protect, AuthRequest } from "../middleware/authMiddleware";

const router = Router();

// Helper: Generate JWT
const generateToken = (userId: string, email: string) => {
  console.log("🔑 Generating JWT for user:", userId, email);
  return jwt.sign({ id: userId, email }, process.env.JWT_SECRET || "secret", {
    expiresIn: "7d",
  });
};

// ✅ Signup
router.post("/signup", async (req, res) => {
  try {
    console.log("📥 Signup request body:", req.body);
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({ firstName, lastName, email, password });
    await user.save();

    const token = generateToken(user._id.toString(), user.email);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        canTeach: user.canTeach,
        wantToLearn: user.wantToLearn,
        connections: user.connections,
      },
    });
  } catch (err) {
    console.error("❌ Error during signup:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(user._id.toString(), user.email);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        canTeach: user.canTeach,
        wantToLearn: user.wantToLearn,
        connections: user.connections,
      },
    });
  } catch (err) {
    console.error("❌ Error during login:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// ✅ Get all users
router.get("/", async (_req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// ✅ Get logged-in user
router.get("/me", protect, async (req: AuthRequest, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not authorized" });

    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching current user:", err);
    res.status(500).json({ error: "Error fetching user" });
  }
});

// ✅ Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching user:", err);
    res.status(500).json({ error: "Error fetching user" });
  }
});

// ✅ Update user
router.put("/:id", protect, async (req: AuthRequest, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not authorized" });
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ error: "You can only update your own profile" });
    }

    const { firstName, lastName, canTeach, wantToLearn } = req.body;
    const updates: any = {};

    if (firstName !== undefined) updates.firstName = firstName;
    if (lastName !== undefined) updates.lastName = lastName;
    if (canTeach !== undefined) updates.canTeach = canTeach;
    if (wantToLearn !== undefined) updates.wantToLearn = wantToLearn;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.error("❌ Error updating user:", err);
    res.status(500).json({ error: "Error updating user" });
  }
});

// ✅ Connect two users (body.targetId)
router.post("/connect", protect, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    const { targetId } = req.body;

    if (!userId) return res.status(401).json({ error: "Not authorized" });
    if (!targetId) return res.status(400).json({ error: "Target user ID required" });
    if (userId === targetId) return res.status(400).json({ error: "You cannot connect with yourself" });

    const user = await User.findById(userId);
    const target = await User.findById(targetId);

    if (!user || !target) return res.status(404).json({ error: "User not found" });

    if (user.connections.includes(target._id)) {
      return res.json({ message: "Already connected", connected: true });
    }

    user.connections.push(target._id);
    target.connections.push(user._id);

    await user.save();
    await target.save();

    res.json({ message: "Connected successfully", connected: true });
  } catch (err) {
    console.error("❌ Error connecting users:", err);
    res.status(500).json({ error: "Error connecting users" });
  }
});

export default router;
