import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { hashPassword, comparePassword, signToken } from "./auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/register", async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const hashed = await hashPassword(password);
      const user = await storage.createUser({ username, password: hashed });
      res.json({ user });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/login", async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      if (!user) return res.status(404).json({ message: "User not found" });

      const match = await comparePassword(password, user.password);
      if (!match) return res.status(401).json({ message: "Invalid password" });

      const token = signToken({ id: user.id });

      res.json({ user, token });
    } catch (err) {
      next(err);
    }
  });

  return httpServer;
}
