import * as RNFS from "react-native-fs";

export function getAppUUID() {
  const rootDir = RNFS.DocumentDirectoryPath;

  const dirNames = rootDir.split("/");
  dirNames.pop();

  return dirNames[dirNames.length - 1];
}
