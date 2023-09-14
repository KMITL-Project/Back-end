import { UploadedFile } from "express-fileupload";
import { ExpressValidator } from "express-validator";

export const validationCustom = new ExpressValidator({
  notFileEmpty: (_, { req }) => (!req.files || Object.keys(req.files).length === 0 || !req.files.sampleFile ? false : true),
  isNotImage: (_, { req }) => {
    if (!req.files) {
      return false;
    }
    var isImage = true;
    Object.keys(req.files).forEach((key) => {
      const file = req.files[key] as UploadedFile;
      if (!file.mimetype.startsWith("image/")) {
        isImage = false;
      }
    });
    return isImage;
  },
});
