import RNFS from "react-native-fs";
import PassKit from "react-native-passkit-wallet";

const BASE_BACKEND_URL = process.env.BACKEND_URL;

export async function downloadPass(): Promise<string> {
  const url = `${BASE_BACKEND_URL}/download-pass/Event.pkpass`;
  const downloadDest = `${RNFS.DocumentDirectoryPath}/downloaded-pass.pass`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/octet-stream",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to download file. Status code: ${response.status}`
      );
    }

    const fileBlob = await response.blob();
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64data = reader.result as string;

      // Write the file to local storage
      await RNFS.writeFile(downloadDest, base64data, "base64");

      const base64Encoded = await RNFS.readFile(downloadDest, "base64");
      console.log("File downloaded successfully");

      return base64Encoded;
    };

    reader.readAsDataURL(fileBlob);
  } catch (error) {
    console.error(error);
  }

  return "";
}
