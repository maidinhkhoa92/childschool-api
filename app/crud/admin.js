"use strict";

const admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

module.exports.create = body => {
  return new Promise((resolve, reject) => {
    body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(8), null);

    admin.create(body, function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(convertData(data));
    });
  });
};

module.exports.login = (username, password) => {
  return new Promise((resolve, reject) => {
    admin
      .findOne({ username: username }, function(error, Admin) {
        if (error) {
          reject(error);
          return;
        }

        if (Admin === null || Admin === undefined || Admin.status === false) {
          reject({ code: 6 });
          return;
        }

        bcrypt.compare(password, Admin.password, (err, resonse) => {
          if (err) {
            reject(err);
            return;
          }
          if (!resonse) {
            reject({ code: 9999 });
            return;
          }

          delete Admin.password;
          const data = {
            type: 'administrator',
            email: Admin.email,
            id: Admin._id
          };
          const token = jwt.sign(data, "token_token_miracles");
          resolve({ ...convertData(Admin), token: token });
        });
      })
      .catch(err => {
        reject({ code: 9999 });
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
