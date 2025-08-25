import type { Express } from "express";
import { createServer, type Server } from "http";
import userRoutes from "./routes/userRoutes"; // ✅ import your routes

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all user-related routes with /api/users
  app.use("/api/users", userRoutes);

  const httpServer = createServer(app);
  return httpServer;
}
