import * as RNFS from "react-native-fs";

export async function deleteFile(
  filepath: RNFS.UploadFileItem["filepath"]
): Promise<void> {
  try {
    await RNFS.unlink(filepath);
  } catch (error) {
    console.error(error);
  }
}
