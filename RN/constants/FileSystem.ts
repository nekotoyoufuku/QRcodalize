import * as RNFS from "react-native-fs";
import * as path from "path";

export const QR_CODALIZE_IMAGE_DIR = "QRCodalize";
export const ROOT_DIR_FILE_PATH = path.join(
  RNFS.MainBundlePath,
  QR_CODALIZE_IMAGE_DIR
);
