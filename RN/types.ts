export type HomeListItemType = {
  title: string;
  base64: string | undefined;
};

export interface OnGeneratePressArgs {
  name: string;
  url: string;
}
