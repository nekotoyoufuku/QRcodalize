import * as RNFS from "react-native-fs";
import { ROOT_DIR_FILE_PATH } from "constants/FileSystem";
import { maybeCreateRootDir } from "./maybeCreateRootDir";

export type IQRCodeFile = {
  name: string;
  path: string;
};

export async function getQRcodeFiles(): Promise<IQRCodeFile[]> {
  await maybeCreateRootDir();

  try {
    const result = await RNFS.readDir(ROOT_DIR_FILE_PATH);

    return result
      .filter((res) => res.isFile)
      .map((file) => ({
        name: file.name,
        path: file.path,
      }));
  } catch (error) {
    console.error(error);

    return [];
  }
}
