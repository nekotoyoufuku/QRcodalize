import { useState } from "react";
import { QRCode } from "@/types";
import { getQRCodes } from "@/repositories/QRCodeData/getQRCodes";

export function useQRCodeList(): {
  qrCodeList: QRCode[];
  updateList: () => void;
} {
  const [qrCodeList, setQrCodeList] = useState<QRCode[]>(getQRCodes());

  function updateList() {
    setQrCodeList(getQRCodes());
  }

  return {
    qrCodeList,
    updateList,
  };
}
