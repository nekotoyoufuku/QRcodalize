import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { createPassData } from "./helper/createPassData";
import { v4 as uuid } from "uuid";

const parentPath = path.resolve(__dirname, "..");
const certPath = path.join(parentPath, "certs/passcertificate.pem");
const keyPath = path.join(parentPath, "certs/privateKey.pem");
const wwdrPath = path.join(parentPath, "certs/WWDR.pem");
const imagesPath = path.join(parentPath, "images");

export async function createPass(_: Request, res: Response) {
  try {
    // create sample-pass folder
    const passFolder = path.join(parentPath, "passes", "sample-pass");
    if (!fs.existsSync(passFolder)) {
      fs.mkdirSync(passFolder, { recursive: true });
    }

    // create pass.json file in sample-pass folder
    const passData = createPassData({
      // TODO: Fix me
      serialNumber: uuid(),
      name: "name",
      message: "message",
      description: "description",
    });
    fs.writeFileSync(
      path.join(passFolder, "pass.json"),
      JSON.stringify(passData, null, 2)
    );

    // copy images to pass folder
    fs.copyFileSync(
      path.join(imagesPath, "icon.png"),
      path.join(passFolder, "icon.png")
    );
    fs.copyFileSync(
      path.join(imagesPath, "logo.png"),
      path.join(passFolder, "logo.png")
    );

    // zip passes/sample-pass.zip
    const zipFilePath = path.join(parentPath, "passes", "sample-pass.zip");
    execSync(`zip -r ${zipFilePath} .`, { cwd: passFolder });

    // Sign files with openssl
    const pkpassFilePath = path.join(
      parentPath,
      "passes",
      "sample-pass.pkpass"
    );
    execSync(
      `openssl smime -sign -in ${zipFilePath} -out ${pkpassFilePath} -signer ${certPath} -inkey ${keyPath} -certfile ${wwdrPath} -outform DER`
    );

    res.json({ success: true, passPath: `/download-pass/sample-pass.pkpass` });
  } catch (error) {
    console.error("Error creating pass:", error);

    res.status(500).json({ success: false, message: "Failed to create pass" });
  }
}
