const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "resume/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const resumeName = uniqueSuffix + "-" + file.originalname;
    req.resumeName = resumeName;
    cb(null, resumeName);
  },
});

const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /pdf/;
    const extension = path.extname(file.originalname);
    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Resume must be a pdf"));
    }
  },
  limits: {
    fileSize: 5000000,
  },
});

module.exports = uploader;
