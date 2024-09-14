import uuid from "react-native-uuid";
import { setMmkvStorage } from "../mmkv/mmkvStorage";
import { QRCode } from "../../types";

export async function setQRCode({
  name,
  data,
}: {
  name: string;
  data: string;
}): Promise<void> {
  try {
    const id = uuid.v4() as string;
    const value = {
      name,
      imageInBase64: data,
    } as Omit<QRCode, "id">;
    const jsonValue = JSON.stringify(value);

    setMmkvStorage(id, jsonValue);
  } catch (error) {
    console.error(`setQRCode: ${error}`);
  }
}
