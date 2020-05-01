"use strict";

const user = require("../models/user");
const transporter = require("../config/nodemailer");
const _ = require("lodash");
const mailTemplate = require("../helper/email");
const child = require("../models/child");

module.exports.create = body => {
  return new Promise((resolve, reject) => {
    user.findOne({ email: body.email }, function (e, data) {
      if (data) {
        reject({ code: 8 });
        return;
      }
      user.create(body, function (err, data) {
        if (err) {
          reject(err);
          return;
        }

        let mailOptions = {
          from: "admin@gmail.com",
          to: data.email,
          subject: mailTemplate.director.subject,
          html: mailTemplate.director.content
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            reject({ code: 11 });
            return;
          }

          resolve(convertData(data));
        });
      });
    })

  });
};

module.exports.list = (params = {}) => {
  return new Promise((resolve, reject) => {
    var query = user.find(params);

    query.sort({ date: -1 }).exec(function (err, data) {
      if (err) {
        reject(err);
      }
      if (data === null) {
        reject({ code: 10000 });
      }
      const result = _.map(data, item => {
        return convertData(item);
      });
      resolve(result);
    });
  });
};

module.exports.detail = id => {
  return new Promise((resolve, reject) => {
    user.findById(id, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data === null) {
        reject({ code: 10000 });
      }

      resolve(convertData(data));
    });
  });
};

module.exports.update = (id, body) => {
  return new Promise((resolve, reject) => {
    const query = {
      _id: id
    };

    user.findOneAndUpdate(query, body, { new: true }, function (err, data) {
      if (err) {
        reject(err);
      }

      resolve(convertData(data));
    });
  });
};

module.exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    user.remove({ _id: id }, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve({ status: 'done' });
    });
  })
}

module.exports.countChild = (director_id) => {
  return new Promise((resolve, reject) => {
    child.count({ directorId: director_id }, function (err, data) {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}

module.exports.resend = email => {
  return new Promise((resolve, reject) => {
    user.findOne({ email: email }, function (e, data) {
      if (!data) {
        reject({ code: 8 });
        return;
      }

      let mailOptions = {
        from: "admin@gmail.com",
        to: email,
        subject: mailTemplate.director.subject,
        html: mailTemplate.director.content
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject({ code: 11 });
          return;
        }

        resolve(convertData(data));
      });
    })

  });
};

const convertData = (data, password = true) => {
  var result = data;
  if (data === null || data === undefined) {
    return null;
  }
  if (data.toObject) {
    result = data.toObject();
  }
  result.id = data._id;
  if (password) {
    delete result.password;
  }
  delete result._id;
  delete result.__v;
  return result;
};
