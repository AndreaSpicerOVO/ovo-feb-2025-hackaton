import type { Request, Response } from "npm:@types/express";
import { db } from "../database.ts";
import { Donut, NewDonut, DonutUpdate } from "../types.ts";

// 🏆 Get all donuts
export async function getAllDonuts(
  req: Request,
  res: Response<Donut[] | { error: string }>
) {
  try {
    const donuts = await db.selectFrom("donuts").selectAll().execute();
    return res.json(donuts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

// 🍩 Create a new donut
export async function createNewDonut(
  req: Request,
  res: Response<Donut | { error: string }>
) {
  try {
    const newDonut: NewDonut = req.body;
    if (!newDonut.name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const [insertedDonut] = await db
      .insertInto("donuts")
      .values(newDonut)
      .returningAll()
      .execute();

    return res.status(201).json(insertedDonut);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

// 🔍 Get a donut by ID
export async function getDonutById(
  req: Request,
  res: Response<Donut | { error: string }>
) {
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
export async function updateDonut(
  req: Request,
  res: Response<Donut | { error: string }>
) {
  try {
    const { id } = req.params;
    const updatedData: DonutUpdate = req.body;

    const updatedDonut = await db
      .updateTable("donuts")
      .set(updatedData)
      .where("id", "=", parseInt(id))
      .returningAll()
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
export async function deleteDonut(
  req: Request,
  res: Response<{ success: boolean } | { error: string }>
) {
  try {
    const { id } = req.params;

    const deletedDonut = await db
      .deleteFrom("donuts")
      .where("id", "=", parseInt(id))
      .returningAll()
      .executeTakeFirst();

    if (!deletedDonut) {
      return res.status(404).json({ error: "Donut not found" });
    }

    return res.status(204).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
