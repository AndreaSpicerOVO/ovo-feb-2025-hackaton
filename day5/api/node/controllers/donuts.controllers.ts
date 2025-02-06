import type { Request, Response } from "npm:@types/express";
import { db } from "../database.ts";
import { Donut } from "../types.ts";

// 🏆 Get all donuts
export async function getAllDonuts(req: Request, res: Response) {
  try {
    const donuts = await db.selectFrom("donuts").selectAll().execute();
    return res.json(donuts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

// 🍩 Create a new donut
export async function createNewDonut(req: Request, res: Response) {
  try {
    const { name, rating, review } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const [newDonut] = await db
      .insertInto("donuts")
      .values({ name, rating, review })
      .returning(["id", "name", "rating", "review"])
      .execute();

    return res.status(201).json(newDonut);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

// 🔍 Get a donut by ID
export async function getDonutById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const donut = await db
      .selectFrom("donuts")
      .where("id", "=", parseInt(id))
      .selectAll()
      .executeTakeFirst();

    if (!donut) {
      return res.status(404).json({ error: "Donut not found" });
    }

    return res.json(donut);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

// ✏️ Update a donut
export async function updateDonut(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, rating, review } = req.body;

    const updatedDonut = await db
      .updateTable("donuts")
      .set({ name, rating, review })
      .where("id", "=", parseInt(id))
      .returning(["id", "name", "rating", "review"])
      .executeTakeFirst();

    if (!updatedDonut) {
      return res.status(404).json({ error: "Donut not found" });
    }

    return res.json(updatedDonut);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

// 🗑️ Delete a donut
export async function deleteDonut(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const deletedDonut = await db
      .deleteFrom("donuts")
      .where("id", "=", parseInt(id))
      .returning(["id", "name"])
      .executeTakeFirst();

    if (!deletedDonut) {
      return res.status(404).json({ error: "Donut not found" });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
