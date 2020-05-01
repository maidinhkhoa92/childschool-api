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

    query.populate('director').sort({ created_at: -1 }).exec(function(err, data) {
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

module.exports.update = (id, body) => {
  return new Promise((resolve, reject) => {
    const query = {
      _id: id
    };

    Payment.findOneAndUpdate(query, body, { new: true, populate: 'director' }, function(err, data) {
      if (err) {
        reject(err);
      }

      resolve(convertData(data));
    });
  });
};

module.exports.detail = id => {
  return new Promise((resolve, reject) => {
    Payment.findById(id).populate('director').exec(function(err, data) {
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
