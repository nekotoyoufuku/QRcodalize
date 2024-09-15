import { Request, Response } from "express";

export async function createPass(req: Request, res: Response) {
  console.log(req);
  console.log(res);

  console.log("hey hey hey");
}
