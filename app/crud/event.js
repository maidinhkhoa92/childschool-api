"use strict";

const event = require("../models/event");
const _ = require("lodash");

module.exports.list = (paged, limit, params = {}) => {
  return new Promise((resolve, reject) => {
    var query = event.find(params);

    if (limit) {
      query = query.limit(limit);
    }

    if (paged) {
      const skiped = (paged - 1) * limit;
      query = query.skip(skiped);
    }

    query.populate("group").exec(function(err, data) {
      if (err) {
        reject(err);
      }
      if (data === null) {
        reject({ code: 10000 });
      }
      const result = _.map(data, item => {
        return convertData(item);
      });

      resolve({
        total: result.length,
        limit: limit,
        paged: paged,
        data: result
      });
    });
  });
};

module.exports.detail = id => {
  return new Promise((resolve, reject) => {
    event
      .findById(id)
      .populate("group")
      .exec(function(err, data) {
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

module.exports.remove = id => {
  return new Promise((resolve, reject) => {
    event.remove({ _id: id }, function(err) {
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
