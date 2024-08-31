import * as RNFS from "react-native-fs";
import { ROOT_DIR_FILE_PATH } from "constants/FileSystem";
import { maybeCreateRootDir } from "./maybeCreateRootDir";
import { breakDownURL } from "@/helper/breakDownURL";

export async function createQRCodeFile({
  name,
  filepath,
}: {
  name: string;
  filepath: string;
}): Promise<void> {
  await maybeCreateRootDir();

  const { extension } = breakDownURL(filepath);
  console.log("creating to: ", ROOT_DIR_FILE_PATH);
  const newFilePath = `${ROOT_DIR_FILE_PATH}/${name}.${extension}`;

  try {
    await RNFS.moveFile(filepath, newFilePath);
  } catch (error) {
    console.error(error);
  }
}
