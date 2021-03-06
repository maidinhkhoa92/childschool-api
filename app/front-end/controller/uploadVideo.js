const multer = require("multer");
const moment = require("moment");
var fs = require('fs');

const imageFilter = function(req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(mp4)$/)) {
    return cb(new Error("Only Video files are allowed!"), false);
  }
  if (file.size > 500000) {
    return cb(new Error("Size : 500KB"), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "videos");
  },
  filename: function(req, file, cb) {
    const name = file.originalname.replace(/\s+/g, "-").toLowerCase();
    cb(null, req.decoded.email + "-" + moment(new Date()).format("DD-MM-YYYY-h-mm-ss-a") + "-" + name);
  }
});

module.exports = function(req, res, next) {
  if (!fs.existsSync('videos')){
    fs.mkdirSync('videos');
  }
  const uploadMedia = multer({ storage: storage, fileFilter: imageFilter }).single('file');
  uploadMedia(req, res, function (err) {
    if (err) {
      res.boom.conflict(err);
    } else {
      req.file.path = req.file.path.replace(/\\/g, "/");
      res.status(200).send({ url: process.env.upload_url + req.file.path });
    }
  });
};
