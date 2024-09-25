import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { createPassData } from "./createPassData";
import { v4 as uuid } from "uuid";

const BASE_PATH = path.resolve(__dirname, "../../");
const certPath = path.join(BASE_PATH, "certs/passcertificate.pem");
const keyPath = path.join(BASE_PATH, "certs/privateKey.pem");
const wwdrPath = path.join(BASE_PATH, "certs/WWDR.pem");
const imagesPath = path.join(BASE_PATH, "images");

export interface CreatePkpassInput {
  name: string;
}

export function createPkpass({ name }: CreatePkpassInput): string {
  const id = uuid();

  try {
    const passFolder = createFolder({ folderName: id });

    createPassJson({
      serialNumber: id,
      name,
      message: "message",
      description: "description",
      passFolder,
    });

    copyImageFiles({
      passFolder,
    });

    const zipFilePath = zipPassFolder({
      name: id,
      passFolder,
    });

    const pkpassFilePath = signAndCreatPkpass({
      name: id,
      zipFilePath,
    });

    const pkpassInBase64 = parseInBase64({
      pkpassFilePath,
    });

    return pkpassInBase64;
  } catch (error) {
    throw new Error(error as any);
  }
}

function createFolder(input: { folderName: string }) {
  const passFolder = path.join(BASE_PATH, "passes", input.folderName);
  if (!fs.existsSync(passFolder)) {
    fs.mkdirSync(passFolder, { recursive: true });
  }

  return passFolder;
}

function createPassJson(input: {
  serialNumber: string;
  passFolder: string;
  name: string;
  message: string;
  description: string;
}) {
  const { serialNumber, passFolder, name, message, description } = input;

  const passData = createPassData({
    serialNumber,
    name,
    message,
    description,
  });

  fs.writeFileSync(
    path.join(passFolder, "pass.json"),
    JSON.stringify(passData, null, 2)
  );
}

function copyImageFiles(input: { passFolder: string }) {
  const { passFolder } = input;

  fs.copyFileSync(
    path.join(imagesPath, "icon.png"),
    path.join(passFolder, "icon.png")
  );
  fs.copyFileSync(
    path.join(imagesPath, "logo.png"),
    path.join(passFolder, "logo.png")
  );

  // TODO: fix me
  fs.copyFileSync(
    path.join(imagesPath, "icon@2x.png"),
    path.join(passFolder, "icon@2x.png")
  );
  fs.copyFileSync(
    path.join(imagesPath, "logo@2x.png"),
    path.join(passFolder, "logo@2x.png")
  );
  fs.copyFileSync(
    path.join(imagesPath, "thumbnail.png"),
    path.join(passFolder, "thumbnail.png")
  );
  fs.copyFileSync(
    path.join(imagesPath, "thumbnail@2x.png"),
    path.join(passFolder, "thumbnail@2x.png")
  );
}

function zipPassFolder(input: { name: string; passFolder: string }) {
  const { name, passFolder } = input;

  const zipFilePath = path.join(BASE_PATH, "passes", `${name}.zip`);

  execSync(`zip -r ${zipFilePath} .`, { cwd: passFolder });

  try {
    // Remove folder
    fs.rmSync(passFolder, { recursive: true, force: true });
  } catch (err) {
    console.warn("error removing pass folder");
  }

  return zipFilePath;
}

function signAndCreatPkpass(input: { name: string; zipFilePath: string }) {
  const { name, zipFilePath } = input;

  const pkpassFilePath = path.join(BASE_PATH, "passes", `${name}.pkpass`);
  // const pkpassFilePath2 = path.join(BASE_PATH, "passes", `Generic.pkpass`);
  execSync(
    `openssl smime -sign -in ${zipFilePath} -out ${pkpassFilePath} -signer ${certPath} -inkey ${keyPath} -certfile ${wwdrPath} -outform DER`
  );

  try {
    // Remove zip file
    fs.unlinkSync(zipFilePath);
  } catch (err) {
    console.warn("error removing pass zip file");
  }

  // TODO: fix me
  return pkpassFilePath;
}

function parseInBase64(input: { pkpassFilePath: string }) {
  const { pkpassFilePath } = input;

  const pkpass = fs.readFileSync(pkpassFilePath);
  const pkpassInBase64 = Buffer.from(pkpass).toString("base64");

  try {
    // Remove pkfile file
    fs.unlinkSync(pkpassFilePath);
  } catch (err) {
    console.warn("error removing pkpass file");
  }

  return pkpassInBase64;
}
