const multer = require('multer');
const user = require('../../services/user');
const cheerio = require('cheerio');
const fs = require('fs');

const imageFilter = function (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(html)$/)) {
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
      cb(null, req.decoded.username + '-' + Date.now() + '-' + file.originalname);
    }
  })
  const uploadHTML = multer({ storage: storage, fileFilter: imageFilter }).single('file');
  uploadHTML(req, res, function (err) {
    if (err) {
      console.log(err);
    } else {
      getData(req.file.path)
        .then(data => {
          req.body.history = data;
          user.update(req).then(User => {
            res.status(200).send(User);
          }).catch(err => {
            error(res.boom, err);
          });
        })
        .catch(err => console.log(err))
    }
  });
};

const getData = path => {
  return new Promise((resolve, reject) => {
    var $ = cheerio.load(fs.readFileSync(path, 'utf-8'));
    var arrTable1 = [];
    var table1 = $('#tab1 table > tbody');
    var rows = table1.find('tr');
    for (var i = 0; i < rows.length - 1; ++i) {
      var arrRow = {};
      var cells = $(rows[i]).find('td');
      for (var j = 0; j < cells.length; ++j) {
        arrRow[j] = $(cells[j]).text();
      }
      arrTable1.push(arrRow);
    }
    resolve(arrTable1);
  })

}
