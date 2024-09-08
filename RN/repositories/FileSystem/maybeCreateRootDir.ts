import * as RNFS from "react-native-fs";
import { getImageAssetsDirPath } from "../../constants/FileSystem";

export async function maybeCreateRootDir(): Promise<void> {
  const imageAssetsDirPath = getImageAssetsDirPath();

  if (await RNFS.exists(imageAssetsDirPath)) {
    return;
  }

  console.log(`"${imageAssetsDirPath}" does not exist. Creating...`);

  try {
    await RNFS.mkdir(imageAssetsDirPath);
  } catch (error) {
    console.error(`maybeCreateRootDir: ${error}`);
  }
}
