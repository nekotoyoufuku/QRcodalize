export interface GenerateWifiQRCodeStringInput {
  encryption: "WPA" | "WEP";
  ssid: string;
  password: string;
}

export function generateWifiQRCodeString({
  encryption,
  ssid,
  password,
}: GenerateWifiQRCodeStringInput) {
  const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};;`;

  return wifiString;
}
