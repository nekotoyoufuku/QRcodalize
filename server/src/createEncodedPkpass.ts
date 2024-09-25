import { Request as _Request, Response } from "express";
import { createPkpass } from "./helper/createPkpass";

type Request = _Request<{
  name: string;
}>;

export async function createEncodedPkpass(req: Request, res: Response) {
  try {
    const pkpass = createPkpass({
      name: req.params.name,
    });

    if (!pkpass) {
      res.status(500).json({
        success: false,
        message: "Something went wrong while creating pkpass",
      });
    }

    res.status(200).json({ success: true, pkpass });
  } catch (error) {
    console.log("server error", error);
    res.status(500).json({ success: false, message: error });
  }
}
