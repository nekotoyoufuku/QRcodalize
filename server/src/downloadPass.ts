import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const parentPath = path.resolve(__dirname, "..");

export async function downloadPass(
  req: Request<{ id: string }>,
  res: Response
) {
  const passId = req.params.id;
  const passFilePath = path.join(parentPath, "passes", `${passId}`);

  if (fs.existsSync(passFilePath)) {
    res.download(passFilePath, `${passId}`, (err) => {
      if (err) {
        console.error("Error sending pass:", err);
        res
          .status(500)
          .json({ success: false, message: "Failed to send pass" });
      }
    });
  } else {
    res.status(404).json({ success: false, message: "Pass not found" });
  }
}
