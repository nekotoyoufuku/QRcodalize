import { v4 as uuid } from "uuid";

export function createPassData(): Record<string, any> {
  const serialNumber = uuid();
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
    // TODO: fix me
    description: "Description here",
    // TODO: fix me
    logoText: "Logo Text here",
    foregroundColor: "rgb(255, 255, 255)",
    backgroundColor: "rgb(0, 0, 0)",
    barcode: {
      format: "PKBarcodeFormatQR",
      // TODO: fix me
      message: "Your message",
      // TODO: fix me
      messageEncoding: "iso-8859-1",
    },
  };

  return passData;
}
