"use strict";

const Payment = require("../models/payment");
const _ = require("lodash");

module.exports.create = body => {
  return new Promise((resolve, reject) => {
    Payment.create(body, function(err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(convertData(data));
    });
    
  });
};

module.exports.list = (params = {}) => {
  return new Promise((resolve, reject) => {
    var query = Payment.find(params);

    query.sort({ created_at: -1 }).exec(function(err, data) {
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

const convertData = (data) => {
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