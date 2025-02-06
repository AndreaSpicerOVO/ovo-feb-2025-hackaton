import { Router } from "express";
import {
  getAllDonuts,
  createNewDonut,
  getDonutById,
  updateDonut,
  deleteDonut,
} from "../controllers/donuts.controllers.ts";
import { logger } from "../middlewares/logger.ts";

const router = Router();
router.use(logger);
router.route("/").get(getAllDonuts).post(createNewDonut);
router.route("/:id").get(getDonutById).put(updateDonut).delete(deleteDonut);

export default router;
