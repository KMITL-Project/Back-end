import { randomUUID } from "crypto";
import { UploadedFile } from "express-fileupload";

export const handleFileUpload = (file: UploadedFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileExtension = file.name.split(".").pop();
    const fileName = `src/upload/${randomUUID()}.${fileExtension}`;

    file.mv(fileName, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(fileName);
      }
    });
  });
};
