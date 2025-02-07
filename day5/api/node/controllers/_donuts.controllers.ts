import type { Request, Response } from "express";

interface Donut {
  name: string;
  id: number;
}

const donutStore: Donut[] = [];
let id = 0;

export function getAllDonuts(req: Request, res: Response) {
  return res.json(donutStore);
}

export function createNewDonut(req: Request, res: Response) {
  const { name } = req.body;

  const thisId = id++;
  const thisDonut = { name, id: thisId };
  donutStore.push(thisDonut);

  return res.json(thisDonut);
}

export function getDonutById(
  req: Request,
  res: Response<Donut | { error: string }>
) {
  const { id } = req.params;
  const donut = donutStore.find((donut) => donut.id === parseInt(id));
  if (donut) {
    return res.json(donut);
  }
  return res.status(404).json({ error: "Donut not found." });
}

export function updateDonut(req: Request, res: Response) {
  try {
    const currentIndex = donutStore.findIndex(
      (donut) => donut.id === parseInt(req.params.id)
    );
    if (currentIndex < 0) {
      return res.status(404).json({ error: "Donut not found" });
    }
    const newDonut = { ...donutStore[currentIndex], ...req.body };
    donutStore[currentIndex] = newDonut;
    res.json(newDonut);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
}

export function deleteDonut(req: Request, res: Response) {
  try {
    const index = donutStore.findIndex(
      (donut) => donut.id === parseInt(req.params.id)
    );
    if (index < 0) {
      return res.status(404).json({ error: "Donut not found" });
    }
    return res.status(202).send();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
}
