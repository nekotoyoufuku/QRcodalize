import * as RNFS from "react-native-fs";
import { getImageAssetsDirPath } from "../../constants/FileSystem";
import { breakDownURL } from "../../helpers/breakDownURL";
import { maybeCreateRootDir } from "./maybeCreateRootDir";

export async function createQRCodeFile({
  name,
  filepath,
}: {
  name: string;
  filepath: string;
}): Promise<void> {
  await maybeCreateRootDir();

  const { extension } = breakDownURL(filepath);
  const imageAssetsDirPath = getImageAssetsDirPath();
  console.log("creating to: ", imageAssetsDirPath);

  const newFilePath = `${imageAssetsDirPath}/${name}.${extension}`;

  try {
    await RNFS.moveFile(filepath, newFilePath);
  } catch (error) {
    console.error(error);
  }
}
