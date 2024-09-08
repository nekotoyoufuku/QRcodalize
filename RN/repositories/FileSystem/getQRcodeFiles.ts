import * as RNFS from "react-native-fs";
import { getImageAssetsDirPath } from "../../constants/FileSystem";

import { maybeCreateRootDir } from "./maybeCreateRootDir";

export type IQRCodeFile = {
  name: string;
  path: string;
};

export async function getQRcodeFiles(): Promise<IQRCodeFile[]> {
  await maybeCreateRootDir();

  try {
    const imageAssetsDirPath = getImageAssetsDirPath();
    const result = await RNFS.readDir(imageAssetsDirPath);

    return result
      .filter((res) => res.isFile)
      .map((file) => ({
        name: file.name,
        path: file.path,
      }));
  } catch (error) {
    console.error(`getQRcodeFiles: ${error}`);

    return [];
  }
}
