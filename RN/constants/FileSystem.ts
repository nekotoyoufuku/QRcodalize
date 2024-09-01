import * as RNFS from "react-native-fs";

export const QR_CODALIZE_IMAGE_DIR = "QRCodalizeAssets";

const regex = /\/QRcodalize.app$/;
export function getRootDir(): string {
  const dirPath = RNFS.MainBundlePath;

  if (regex.test(dirPath)) {
    return dirPath;
  }

  const splitPath = dirPath.split("/");
  while (splitPath.length > 0) {
    if (splitPath[splitPath.length - 1] === "QRcodalize.app") {
      return splitPath.join("/");
    }

    splitPath.pop();
  }

  throw new Error(`Something went wrong at getRootDir(): ${dirPath}`);
}

export const IMAGE_ASSET_DIR_PATH = `${getRootDir()}/${QR_CODALIZE_IMAGE_DIR}`;
