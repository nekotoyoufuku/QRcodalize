import { IconType, QRCode } from "@/types";

export function getIconName(data: QRCode): IconType {
  const name = data.name.toLowerCase();

  if (name.includes("facebook")) {
    return "facebook";
  }

  if (name.includes("linkedin")) {
    return "linkedin";
  }

  if (name.includes("threads")) {
    return "threads";
  }

  if (name.includes("tiktok")) {
    return "tiktok";
  }

  if (name.includes("twitter")) {
    return "twitter";
  }

  if (name.includes("twitch")) {
    return "twitch";
  }

  if (name.includes("whatsapp")) {
    return "whatsapp";
  }

  return "default";
}
