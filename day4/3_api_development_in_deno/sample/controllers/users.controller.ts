import db from "../db.ts";
import { Request, Response } from "npm:express";

/**
 * Get all users
 */
export function getAllUsers(req: Request, res: Response) {
  try {
    const users = db.prepare("SELECT * FROM users").all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

/**
 * Get a single user by ID
 */
export function getUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
}

/**
 * Add a new user
 */
export function addUser(req: Request, res: Response) {
  try {
    const { name, age } = req.body;
    console.log(req.body);
    if (!name || !age) {
      return res.status(400).json({ error: "Name and age are required" });
    }

    const stmt = db
      .prepare("INSERT INTO users (name, age) VALUES (?, ?)")
      .run(name, age);
    const newUser = { id: stmt.lastInsertRowid, name, age };

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add user" });
  }
}

/**
 * Update an existing user
 */
export function updateUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const { name, age } = req.body;

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    db.prepare("UPDATE users SET name = ?, age = ? WHERE id = ?").run(
      name ?? user.name,
      age ?? user.age,
      userId
    );

    res.json({ id: userId, name: name ?? user.name, age: age ?? user.age });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
}

/**
 * Delete a user
 */
export function deleteUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    db.prepare("DELETE FROM users WHERE id = ?").run(userId);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
}
