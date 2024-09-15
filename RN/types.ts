export type QRCode = {
  id: string;
  name: string;
  imageInBase64: string | undefined;
};

export interface GenerateQRCodeInput {
  name: string;
  url: string;
}
