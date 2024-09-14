import { deleteMmkvStorage } from "@/repositories/mmkv/mmkvStorage";

export function deleteQRCode(id: string): void {
  try {
    deleteMmkvStorage(id);
  } catch (error) {
    console.error(error);
  }
}
