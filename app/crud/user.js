"use strict";

const user = require("../models/user");
const transporter = require("../config/nodemailer");
const _ = require("lodash");
const mailTemplate = require("../helper/email");

module.exports.create = body => {
  return new Promise((resolve, reject) => {
    user.create(body, function(err, data) {
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

      if (data.typeOfUser === "staff") {
        mailOptions.subject = mailTemplate.staff.subject;
        mailOptions.html = mailTemplate.staff.content;
      }

      if (data.typeOfUser === "family") {
        mailOptions.subject = mailTemplate.family.subject;
        mailOptions.html = mailTemplate.family.content;
      }

      transporter.sendMail(mailOptions, function(error, info) {
        if (err) {
          reject(error);
          return;
        }

        resolve(convertData(data));
      });
    });
  });
};

module.exports.list = (params = {}) => {
  return new Promise((resolve, reject) => {
    var query = user.find(params);

    query.sort({ date: -1 }).exec(function(err, data) {
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
