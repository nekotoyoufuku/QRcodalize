import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { createPassData } from "./createPassData";
import { v4 as uuid } from "uuid";

const parentPath = path.resolve(__dirname, "../../");
const certPath = path.join(parentPath, "certs/passcertificate.pem");
const keyPath = path.join(parentPath, "certs/privateKey.pem");
const wwdrPath = path.join(parentPath, "certs/WWDR.pem");
const imagesPath = path.join(parentPath, "images");

export interface CreatePkpassInput {
  name: string;
}

export function createPkpass({ name }: CreatePkpassInput): string {
  const id = uuid();

  try {
    // Create folder
    const passFolder = path.join(parentPath, "passes", id);
    if (!fs.existsSync(passFolder)) {
      fs.mkdirSync(passFolder, { recursive: true });
    }

    // Create pass.json file in sample-pass folder
    const passData = createPassData({
      // TODO: Fix me
      serialNumber: id,
      name,
      message: "message",
      description: "description",
    });
    fs.writeFileSync(
      path.join(passFolder, "pass.json"),
      JSON.stringify(passData, null, 2)
    );

    // Copy images to pass folder
    fs.copyFileSync(
      path.join(imagesPath, "icon.png"),
      path.join(passFolder, "icon.png")
    );
    fs.copyFileSync(
      path.join(imagesPath, "logo.png"),
      path.join(passFolder, "logo.png")
    );

    // Zip passes/<id>.zip
    const zipFilePath = path.join(parentPath, "passes", `${id}.zip`);
    execSync(`zip -r ${zipFilePath} .`, { cwd: passFolder });

    // Sign files with openssl
    const pkpassFilePath = path.join(parentPath, "passes", `${id}.pkpass`);
    const pkpassFilePath2 = path.join(parentPath, "passes", `Event.pkpass`);
    execSync(
      `openssl smime -sign -in ${zipFilePath} -out ${pkpassFilePath} -signer ${certPath} -inkey ${keyPath} -certfile ${wwdrPath} -outform DER`
    );

    const pkpass = fs.readFileSync(pkpassFilePath2);
    const pkpassInBase64 = Buffer.from(pkpass).toString("base64");

    // Remove folder
    fs.rmSync(passFolder, { recursive: true, force: true });
    // Remove zip file
    fs.unlinkSync(zipFilePath);
    // Remove pkfile file
    fs.unlinkSync(pkpassFilePath);

    return pkpassInBase64;
  } catch (error) {
    console.error("Error creating pass:", error);
  }

  // TODO: fix me
  return "";
}
