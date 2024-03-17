import { Request, Response } from "express";

export function getAccount(req: Request, res: Response): Response {
  return res.json({ message: "Get Account" });
}