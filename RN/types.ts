export type QRCode = {
  id: string;
  name: string;
  imageInBase64: string | undefined;
};

export interface OnGeneratePressArgs {
  name: string;
  url: string;
}
