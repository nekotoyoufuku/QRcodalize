import { MMKV } from "react-native-mmkv";

const mmkvStorage = new MMKV();

export const setMmkvStorage = (key: string, value: string) => {
  mmkvStorage.set(key, value);
};

export const getMmkvStorage = (key: string) => {
  return mmkvStorage.getString(key);
};

export const getAllKeysMmkvStorage = () => {
  return mmkvStorage.getAllKeys();
};

export const deleteMmkvStorage = (key: string) => {
  mmkvStorage.delete(key);
};
