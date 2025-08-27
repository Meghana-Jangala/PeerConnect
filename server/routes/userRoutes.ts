import { Router } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

const router = Router();

// Helper: Generate JWT
const generateToken = (userId: string, email: string) => {
  console.log("🔑 Generating JWT for user:", userId, email);
  return jwt.sign({ id: userId, email }, process.env.JWT_SECRET || "secret", {
    expiresIn: "7d",
  });
};

// ✅ Signup (Register)
router.post("/signup", async (req, res) => {
  try {
    console.log("📥 Signup request body:", req.body);
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log("🔎 Existing user check:", existingUser ? "FOUND" : "NOT FOUND");

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const user = new User({ firstName, lastName, email, password });
    console.log("🟡 New user (pre-save):", user);

    await user.save();
    console.log("✅ User saved to DB with id:", user._id.toString());

    // Generate JWT
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
    console.log("📥 Login request body:", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("🔎 Login user lookup:", user ? user._id.toString() : "NOT FOUND");

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    console.log("🔐 Password match result:", isMatch);

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
    console.log("📡 Fetching all users...");
    const users = await User.find().select("-password");
    console.log("✅ Users fetched:", users.length);
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// ✅ Get a specific user by ID
router.get("/:id", async (req, res) => {
  try {
    console.log("📡 Fetching user by ID:", req.params.id);
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      console.log("❌ User not found with ID:", req.params.id);
      return res.status(404).json({ error: "User not found" });
    }
    console.log("✅ User found:", user._id.toString());
    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching user:", err);
    res.status(500).json({ error: "Error fetching user" });
  }
});

// ✅ Update user profile (partial updates, with proper skills handling)
router.put("/:id", async (req, res) => {
  try {
    console.log("📥 Update request for user ID:", req.params.id);
    console.log("📦 Update data received:", req.body);

    const { firstName, lastName, canTeach, wantToLearn } = req.body;

    // Explicitly construct allowed updates to avoid overwriting
    const updates: any = {};
    if (firstName !== undefined) updates.firstName = firstName;
    if (lastName !== undefined) updates.lastName = lastName;
    if (canTeach !== undefined) {
      console.log("✏️ Updating canTeach to:", canTeach);
      updates.canTeach = canTeach;
    }
    if (wantToLearn !== undefined) {
      console.log("✏️ Updating wantToLearn to:", wantToLearn);
      updates.wantToLearn = wantToLearn;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    ).select("-password");

    if (!user) {
      console.log("❌ User not found for update:", req.params.id);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("✅ User updated successfully:", user);
    res.json({
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    console.error("❌ Error updating user:", err);
    res.status(500).json({ error: "Error updating user" });
  }
});

export default router;
