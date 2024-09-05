import { maybeCreateRootDir } from "./maybeCreateRootDir";
import * as RNFS from "react-native-fs";
import { IMAGE_ASSET_DIR_PATH } from "../../constants/FileSystem";

export async function generateQRCode({
  filename,
  data,
}: {
  filename: string;
  data: string;
}): Promise<void> {
  await maybeCreateRootDir();
  const filePath = `${IMAGE_ASSET_DIR_PATH}/${filename}.png`;

  try {
    await RNFS.writeFile(filePath, data, "base64");
  } catch (error) {
    console.error(error);
  }
}
