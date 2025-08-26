import type { Express } from "express";
import userRoutes from "./routes/userRoutes"; // ✅ import your routes

// This function just registers routes on the Express app
export async function registerRoutes(app: Express): Promise<void> {
  // prefix all user-related routes with /api/users
  app.use("/api/users", userRoutes);

  // 👉 Later you can add more route groups here
  // app.use("/api/posts", postRoutes);
}
