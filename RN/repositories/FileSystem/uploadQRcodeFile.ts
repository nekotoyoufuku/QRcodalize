import * as RNFS from "react-native-fs";
import { ROOT_DIR_FILE_PATH } from "constants/FileSystem";
import { maybeCreateRootDir } from "./maybeCreateRootDir";

export async function uploadQRcodeFile(
  file: Pick<RNFS.UploadFileItem, "name" | "filepath">
): Promise<Pick<RNFS.UploadResult, "statusCode" | "headers" | "body">> {
  await maybeCreateRootDir();

  try {
    const { promise: promiseUploadResult } = RNFS.uploadFiles({
      toUrl: ROOT_DIR_FILE_PATH,
      files: [
        {
          filename: file.name,
          name: file.name,
          filepath: file.filepath,
          // TODO: fix me
          filetype: "jpeg",
        },
      ],
    });

    return await promiseUploadResult;
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      headers: {},
      body: `${error}`,
    };
  }
}
