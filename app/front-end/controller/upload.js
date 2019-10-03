const multer = require('multer');

const imageFilter = function (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  if (file.size > 1000000) {
    return cb(new Error('Size : 1mb'), false);
  }
  cb(null, true);
};


module.exports = function (req, res) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, req.decoded.email + '-' + Date.now() + '-' + file.originalname);
    }
  })
  const uploadHTML = multer({ storage: storage, fileFilter: imageFilter }).single('file');
  uploadHTML(req, res, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({url: req.file.path})
    }
  });
};
