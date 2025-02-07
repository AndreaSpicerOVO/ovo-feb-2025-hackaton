import express, { Request, Response } from "express";
import donutRoutes from "./routes/donuts.routes";
import { logger } from "./middlewares/logger";

const app = express();
app.use(express.json());
app.use(logger);

app.get("/", logger, (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

app.use("/api/v1", donutRoutes);

app.listen(4321);
