export function breakDownURL(url: string): {
  name: string;
  extension: string;
} {
  const file = url.split("/").pop();

  if (!file) {
    console.error("Filed to get filename from url");

    // TODO: Fix me
    return {
      name: "",
      extension: "",
    };
  }

  const [filename, extension] = file.split(".");

  if (!filename || !extension) {
    console.error("Filed to get filename or extension from url");

    // TODO: Fix me
    return {
      name: "",
      extension: "",
    };
  }

  return {
    name: filename,
    extension,
  };
}
