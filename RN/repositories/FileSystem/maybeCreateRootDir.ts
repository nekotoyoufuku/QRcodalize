import * as RNFS from "react-native-fs";
import { ROOT_DIR_FILE_PATH } from "constants/FileSystem";

export async function maybeCreateRootDir(): Promise<void> {
  if (await RNFS.exists(ROOT_DIR_FILE_PATH)) {
    return;
  }

  try {
    RNFS.mkdir(ROOT_DIR_FILE_PATH);
  } catch (error) {
    console.error(error);
  }
}
