import dotenv from "dotenv";
dotenv.config();

import mongoose, { Schema, model } from "mongoose";
import { type User, type InsertUser } from "@shared/schema";

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: String,
  },
  { timestamps: true }
);

const UserModel = model<User>("User", userSchema);

export interface IStorage {
  getUser(id: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  createUser(user: InsertUser): Promise<User>;
}

export class MongoStorage implements IStorage {
  async getUser(id: string): Promise<User | null> {
    return UserModel.findById(id).lean();
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return UserModel.findOne({ username }).lean();
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user = new UserModel(insertUser);
    await user.save();
    return user.toObject();
  }
}

export const storage = new MongoStorage();
