"use strict";

const user = require("../models/user");
const transporter = require("../config/nodemailer");
const _ = require("lodash");
const mailTemplate = require("../helper/email");

const create = body => {
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

const list = (paged, limit, params = {}) => {
  return new Promise((resolve, reject) => {
    var query = user.find(params);

    if (limit) {
      query = query.limit(limit);
    }

    if (paged) {
      const skip = paged * limit;
      query = query.skip(skip);
    }

    query.sort({ date: -1 }).exec(function(err, data) {
      if (err) {
        reject(err);
      }
      if (data === null) {
        reject({ code: 10000 });
      }
      user.count({}, function(err, count) {
        const result = {
          paged: paged,
          limit: limit,
          total: count,
          data: _.map(data, item => {
            return convertData(item);
          })
        };
        resolve(result);
      });
    });
  });
};

const update = (id, body) => {
  return new Promise((resolve, reject) => {
    const query = {
      _id: id
    };

    user.findOneAndUpdate(query, body, { new: true }, function(err, data) {
      if (err) {
        reject(err);
      }

      resolve(convertData(data));
    });
  });
};

const detail = id => {
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

const remove = id => {
  return new Promise((resolve, reject) => {
    user.remove({ _id: id }, function(err) {
      if (err) {
        reject(err);
      }
      resolve({ status: "done" });
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

module.exports = {
  create,
  list,
  update,
  detail,
  remove
};
