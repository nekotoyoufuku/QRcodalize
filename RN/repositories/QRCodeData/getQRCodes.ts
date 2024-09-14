import { getAllKeysMmkvStorage, getMmkvStorage } from "../mmkv/mmkvStorage";
import { QRCode } from "../../types";

export function getQRCodes(): QRCode[] {
  const imageKeys = getAllKeysMmkvStorage();

  const qrCodes = imageKeys.map((key) => {
    const data = getMmkvStorage(key);

    if (!data || data === "") {
      return null;
    }

    return {
      id: key,
      ...(JSON.parse(data) as Omit<QRCode, "id">),
    };
  });

  return qrCodes.filter((q) => q !== null);
}
