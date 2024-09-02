import * as RNFS from "react-native-fs";
import { IMAGE_ASSET_DIR_PATH } from "constants/FileSystem";
import { maybeCreateRootDir } from "./maybeCreateRootDir";
import { breakDownURL } from "@/helpers/breakDownURL";

export async function createQRCodeFile({
  name,
  filepath,
}: {
  name: string;
  filepath: string;
}): Promise<void> {
  await maybeCreateRootDir();

  const { extension } = breakDownURL(filepath);
  console.log("creating to: ", IMAGE_ASSET_DIR_PATH);
  const newFilePath = `${IMAGE_ASSET_DIR_PATH}/${name}.${extension}`;

  try {
    await RNFS.moveFile(filepath, newFilePath);
  } catch (error) {
    console.error(error);
  }
}
