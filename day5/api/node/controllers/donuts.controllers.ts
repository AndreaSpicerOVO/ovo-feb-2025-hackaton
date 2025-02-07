import type { Request, Response } from "express";
import { db } from "../database";
import { Donut, NewDonut, DonutUpdate } from "../types";

// 🏆 Get all donuts
export async function getAllDonuts(
  _req: Request,
  res: Response<Donut[] | { error: string }>
) {
  try {
    const donuts = await db.selectFrom("donuts").selectAll().execute();
    res.json(donuts);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
    return;
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
      res.status(400).json({ error: "Name is required" });
      return;
    }

    const [insertedDonut] = await db
      .insertInto("donuts")
      .values(newDonut)
      .returningAll()
      .execute();

    res.status(201).json(insertedDonut);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
    return;
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
      res.status(404).json({ error: "Donut not found" });
      return;
    }

    res.json(donut);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
    return;
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
      res.status(404).json({ error: "Donut not found" });
      return;
    }

    res.json(updatedDonut);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
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
      res.status(404).json({ error: "Donut not found" });
      return;
    }

    res.status(204).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
