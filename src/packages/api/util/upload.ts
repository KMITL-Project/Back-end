import { randomUUID } from "crypto";
import { UploadedFile } from "express-fileupload";

export const handleFileUpload = (files: UploadedFile | UploadedFile[], fileName: string) => {
  if (!Array.isArray(files)) {
    files.mv(fileName, (err) => {
      if (err) console.log("error:", err);
    });
  }
};
