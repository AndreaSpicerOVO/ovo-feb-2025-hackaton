import type { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  // Do something with the request or the response and then get out of the way
  // as quickly as possible.
  console.log(req.url);
  next();
}
