import multer from "multer";
const allowedImageTypes = ["jpg", "jpeg", "png"];

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (allowedImageTypes.includes(file.mimetype.split("/")[1])) {
    cb(null, true);
  } else {
    cb(new Error("Not a Image File!!"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export default upload;