import { QRCode } from "../../types";
import { getMmkvStorage } from "../mmkv/mmkvStorage";
import { setQRCode } from "./setQRCode";

export function renameQRCode({ id, name }: { id: string; name: string }): void {
  const value = getMmkvStorage(id);

  if (!value) {
    console.error(`renameQRCode: ${id} doesn't exist`);
    return;
  }

  const objValue = JSON.parse(value) as Omit<QRCode, "id">;
  objValue.name = name;

  setQRCode({
    id,
    name,
    data: objValue.imageInBase64!,
  });
}
