export type QRCode = {
  id: string;
  name: string;
  imageInBase64: string;
};

export interface GenerateQRCodeInput {
  name: string;
  url: string;
}
