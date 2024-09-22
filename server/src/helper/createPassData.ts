export interface CreatePassDateInput {
  serialNumber: string;
  name: string;
  message: string;
  description: string;
}

export function createPassData({
  serialNumber,
  name,
  message,
  description,
}: CreatePassDateInput): Record<string, any> {
  const env = process.env;
  const passTypeIdentifier = env.PASS_TYPE_IDENTIFIER;
  const teamIdentifier = env.TEAM_IDENTIFIER;
  const organizationName = env.ORGANIZATION_NAME;

  if (!passTypeIdentifier || !teamIdentifier || !organizationName) {
    console.error("Required data is missing");
  }

  const passData = {
    formatVersion: 1,
    passTypeIdentifier,
    serialNumber,
    teamIdentifier,
    organizationName,
    description,
    logoText: name,
    foregroundColor: "rgb(255, 255, 255)",
    backgroundColor: "rgb(0, 0, 0)",
    barcode: {
      format: "PKBarcodeFormatQR",
      message,
      // TODO: fix me
      messageEncoding: "iso-8859-1",
    },
  };

  return passData;
}
