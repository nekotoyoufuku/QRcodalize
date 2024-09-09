import * as RNFS from "react-native-fs";
import { getImageAssetsDirPath } from "../../constants/FileSystem";
import { breakDownURL } from "../../helpers/breakDownURL";
import { maybeCreateRootDir } from "./maybeCreateRootDir";

export async function createQRCodeFile({
  name,
  filepath,
  onMessage,
}: {
  name: string;
  filepath: string;
  onMessage: (message: string) => void;
}): Promise<void> {
  onMessage(`[just in case] createQRCodeFile is triggered`);
  await maybeCreateRootDir();

  const { extension } = breakDownURL(filepath);
  const imageAssetsDirPath = getImageAssetsDirPath();
  console.log("creating to: ", imageAssetsDirPath);

  const newFilePath = `${imageAssetsDirPath}/${name}.${extension}`;
  onMessage(`path: ${newFilePath} \n\n currentPath: ${filepath}`);

  try {
    await RNFS.moveFile(filepath, newFilePath);
  } catch (error) {
    console.error(error);
    onMessage(
      `path: ${newFilePath} \n\n currentPath: ${filepath} \n\n error: ${error}`
    );
  }
}
