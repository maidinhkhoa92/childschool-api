"use strict";

const contact = require("../models/contact");
const _ = require("lodash");
const mailTemplate = require("../helper/email");
const transporter = require("../config/nodemailer");
const parameters = require("../config/parameters.json");

const create = body => {
  return new Promise((resolve, reject) => {
      let mailOptions = {
        from: "admin@gmail.com",
        to: parameters.adminMail,
        subject: mailTemplate.contact.subject,
        html: mailTemplate.contact.content(body)
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          reject(error);
          return;
        }

        resolve(body);
      });
  });
};

const list = (paged, limit) => {
  return new Promise((resolve, reject) => {
    var query = contact.find();

    if (limit) {
      query = query.limit(limit);
    }

    if (paged) {
      const skip = (paged - 1) * limit;
      query = query.skip(skip);
    }

    query.sort({ date: -1 }).exec(function(err, data) {
      if (err) {
        reject(err);
      }

      if (data === null) {
        reject({ code: 10000 });
      }

      const result = {
        paged: paged,
        limit: limit,
        total: data.length,
        data: _.map(data, item => {
          return convertData(item);
        })
      };
      resolve(result);
    });
  });
};

const remove = id => {
  return new Promise((resolve, reject) => {
    contact.remove({ _id: id }, function(err) {
      if (err) {
        reject(err);
      }
      resolve({ status: "done" });
    });
  });
};

const convertData = data => {
  var result = data;
  if (data === null || data === undefined) {
    return null;
  }
  if (data.toObject) {
    result = data.toObject();
  }
  result.id = data._id;
  delete result._id;
  delete result.__v;
  return result;
};

module.exports = {
  create,
  list,
  remove
};
