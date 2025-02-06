// @ts-types="npm:@types/express@4.17.15"
import express from "express";
import donutRoutes from "./routes/donuts.routes.ts";
import { logger } from "./middlewares/logger.ts";

const app = express();
app.use(express.json());
app.use(logger);

app.get("/", logger, (req, res) => {
  console.log(req);
  return res.json({ message: "Hello" });
});

app.use("/api/v1/donuts", donutRoutes);

app.listen(4321);
