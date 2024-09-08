import { mmkvStorage } from "@/repositories/mmkv/mmkvStorage";

import { getAppUUID } from "@/repositories/FileSystem/getAppUUID";

export function useSetupApp() {
  const appUUID = getAppUUID();

  mmkvStorage.set("appUUID", appUUID);
}
