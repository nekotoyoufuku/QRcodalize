import { deleteMmkvStorage } from "@/repositories/mmkv/mmkvStorage";

export async function deleteFile(name: string): Promise<void> {
  try {
    deleteMmkvStorage(name);
  } catch (error) {
    console.error(error);
  }
}
