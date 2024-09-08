import { maybeCreateRootDir } from "./maybeCreateRootDir";
import * as RNFS from "react-native-fs";
import { getImageAssetsDirPath } from "../../constants/FileSystem";

export async function generateQRCode({
  filename,
  data,
}: {
  filename: string;
  data: string;
}): Promise<void> {
  await maybeCreateRootDir();
  const filePath = `${getImageAssetsDirPath()}/${filename}.png`;

  try {
    await RNFS.writeFile(filePath, data, "base64");
  } catch (error) {
    console.error(error);
  }
}
