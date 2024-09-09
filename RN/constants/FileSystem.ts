import * as RNFS from "react-native-fs";
import { mmkvStorage } from "../repositories/mmkv/mmkvStorage";

export const QR_CODALIZE_IMAGE_DIR = "QRCodalizeAssets";

const regex = /\/Application$/;
function getRootDir(): string {
  const dirPath = RNFS.DocumentDirectoryPath;

  if (regex.test(dirPath)) {
    return dirPath;
  }

  const splitPath = dirPath.split("/");
  while (splitPath.length > 0) {
    if (splitPath[splitPath.length - 1] === "Data") {
      break;
    }

    splitPath.pop();
  }

  if (splitPath.length === 0) {
    console.error(
      "Something went wrong while getting root dir: splitPath.length === 0"
    );
  }

  const uuid = mmkvStorage.getString("appUUID");

  if (!uuid) {
    console.error("Something went wrong while getting root dir: !uuid");
  }

  splitPath.push("Application");
  splitPath.push(uuid!);
  splitPath.push("Documents");

  return splitPath.join("/");
}

export function getImageAssetsDirPath() {
  return `${getRootDir()}/${QR_CODALIZE_IMAGE_DIR}`;
}
