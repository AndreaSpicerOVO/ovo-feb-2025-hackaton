import { Router } from "express";

import { logger } from "../middlewares/logger";
import { generateApiDefintion } from "../controllers/openapi-generator";

const router = Router();
router.use(logger);
router.route("/generate").post(generateApiDefintion);

export default router;
