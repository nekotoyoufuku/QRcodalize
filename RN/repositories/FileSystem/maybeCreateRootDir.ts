import * as RNFS from "react-native-fs";
import { IMAGE_ASSET_DIR_PATH } from "../../constants/FileSystem";

export async function maybeCreateRootDir(): Promise<void> {
  if (await RNFS.exists(IMAGE_ASSET_DIR_PATH)) {
    return;
  }

  console.log(`"${IMAGE_ASSET_DIR_PATH}" does not exist. Creating...`);

  try {
    await RNFS.mkdir(IMAGE_ASSET_DIR_PATH);
  } catch (error) {
    console.error(`maybeCreateRootDir: ${error}`);
  }
}
