import * as RNFS from "react-native-fs";
import { IMAGE_ASSET_DIR_PATH } from "../../constants/FileSystem";

import { maybeCreateRootDir } from "./maybeCreateRootDir";

export type IQRCodeFile = {
  name: string;
  path: string;
};

export async function getQRcodeFiles(): Promise<IQRCodeFile[]> {
  await maybeCreateRootDir();

  try {
    const result = await RNFS.readDir(IMAGE_ASSET_DIR_PATH);

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
