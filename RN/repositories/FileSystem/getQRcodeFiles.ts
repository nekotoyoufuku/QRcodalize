import {
  getAllKeysMmkvStorage,
  getMmkvStorage,
} from "../../repositories/mmkv/mmkvStorage";

export type IQRCodeFile = {
  name: string;
  base64: string | undefined;
};

export async function getQRcodeFiles(): Promise<IQRCodeFile[]> {
  const imageKeys = getAllKeysMmkvStorage();
  const imageBase64 = imageKeys.map((key) => {
    const base64 = getMmkvStorage(key);
    return {
      name: key,
      base64,
    };
  });

  return imageBase64;
}
