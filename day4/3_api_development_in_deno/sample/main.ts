// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "npm:express@4.18.2";
import userRouter from "./routes/users.routes.ts";
const app = express();
const PORT = Number(Deno.env.get("PORT")) || 3000;

app.use(express.json());
app.get("/", (_req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Hello from Deno and Express!");
});

app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
