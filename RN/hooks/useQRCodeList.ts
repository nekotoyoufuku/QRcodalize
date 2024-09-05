import { useEffect, useState } from "react";
import { HomeListItemType } from "@/types";
import { getQRcodeFiles } from "@/repositories/FileSystem/getQRcodeFiles";

export function useQRCodeList(): {
  qrCodeList: HomeListItemType[];
  updateList: () => void;
} {
  const [qrCodeList, setQrCodeList] = useState<HomeListItemType[]>([]);
  const [meaninglessCounter, setMeaninglessCounter] = useState(0);

  function updateList() {
    setMeaninglessCounter((prev) => prev + 1);
  }

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
  }, [meaninglessCounter]);

  return {
    qrCodeList,
    updateList,
  };
}
