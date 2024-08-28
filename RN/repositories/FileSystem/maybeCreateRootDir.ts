import * as RNFS from "react-native-fs";
import { ROOT_DIR_FILE_PATH } from "constants/FileSystem";

export async function maybeCreateRootDir(): Promise<void> {
  if (await RNFS.exists(ROOT_DIR_FILE_PATH)) {
    return;
  }

  console.log(`"${ROOT_DIR_FILE_PATH}" does not exist. Creating...`);

  try {
    await RNFS.mkdir(ROOT_DIR_FILE_PATH);
  } catch (error) {
    console.error(`maybeCreateRootDir: ${error}`);
  }
}
