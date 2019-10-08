const multer = require('multer');
const moment = require('moment');
const parametes = require('../../config/parameters.json');

const imageFilter = function (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(pdf)$/)) {
    return cb(new Error('Only PDF files are allowed!'), false);
  }
  if (file.size > 1000000) {
    return cb(new Error('Size : 1mb'), false);
  }
  cb(null, true);
};


module.exports = function (req, res) {
  const current = moment(new Date()).format("DD-MM-YYYY-h:mm:ss-a");
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/menu');
    },
    filename: function (req, file, cb) {
      const name = file.originalname.replace(/\s+/g, '-').toLowerCase();
      cb(null, req.decoded.email + '-' + current + '-' + name);
    }
  })
  const upload = multer({ storage: storage, fileFilter: imageFilter }).single('file');
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({url: parametes.uploadUrl+req.file.path})
    }
  });
};