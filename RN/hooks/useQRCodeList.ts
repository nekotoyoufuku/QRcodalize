import { useEffect, useState } from "react";
import { HomeListItemType } from "@/app/(tabs)/types";
import { getQRcodeFiles } from "@/repositories/FileSystem/getQRcodeFiles";

export function useQRCodeList() {
  const [qrCodeList, setQrCodeList] = useState<HomeListItemType[]>([]);

  useEffect(() => {
    (async () => {
      const items = await getQRcodeFiles();

      setQrCodeList(
        items.map((item) => ({
          title: item.name,
          url: item.path,
        }))
      );
    })();
  }, []);

  return {
    qrCodeList,
  };
}
