import {
  getQRcodeFiles,
  IQRCodeFile,
} from "@/repositories/FileSystem/getQRcodeFiles";
import { useEffect, useState } from "react";

export function useGetQRCodeFiles(): {
  files: IQRCodeFile[];
} {
  const [files, setFiles] = useState<IQRCodeFile[]>([]);

  useEffect(() => {
    (async () => {
      const _files = await getQRcodeFiles();
      const typedFiles = _files.map((file) => ({
        name: file.name,
        path: file.path,
      }));

      setFiles(typedFiles);
    })();
  }, []);

  return {
    files,
  };
}
