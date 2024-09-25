import axios from "axios";

type ApiResponse = {
  success: boolean;
  pkpass: string;
};

export interface CreateEncodedPkpassInput {
  pkpassName: string;
}

export async function createEncodedPkpass({
  pkpassName,
}: CreateEncodedPkpassInput): Promise<string> {
  const url = `${process.env.BACKEND_URL}/create-encoded-pkpass/${pkpassName}`;

  try {
    const response = await axios<ApiResponse>(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.data.success) {
      throw new Error(`Failed to get pkpass. Status code: ${response.status}`);
    }

    return response.data.pkpass;
  } catch (error) {
    console.log("error", error);

    throw new Error(error as any);
  }
}
