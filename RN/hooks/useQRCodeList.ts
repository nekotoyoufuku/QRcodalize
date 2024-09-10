import { useCallback, useEffect, useState } from "react";
import { HomeListItemType } from "@/types";
import { getQRcodeFiles } from "@/repositories/FileSystem/getQRcodeFiles";

export function useQRCodeList(): {
  qrCodeList: HomeListItemType[];
  updateList: () => void;
} {
  const [qrCodeList, setQrCodeList] = useState<HomeListItemType[]>([]);

  useEffect(() => {
    getQRcodeList();
  }, []);

  function updateList() {
    getQRcodeList();
  }

  const getQRcodeList = useCallback(async () => {
    const items = await getQRcodeFiles();
    const qrCodeListItems = items.map((item) => {
      return {
        title: item.name,
        base64: item.base64,
      };
    });

    setQrCodeList(qrCodeListItems);
  }, []);

  return {
    qrCodeList,
    updateList,
  };
}
