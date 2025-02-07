import { Router } from "express";

import { logger } from "../middlewares/logger";
import { generateApiDefintion, getApiDefinition } from "../controllers/openapi-generator";

const router = Router();
router.use(logger);
router.route("/generate").post(generateApiDefintion);
router.route("/docs/:id").get(getApiDefinition);

export default router;
