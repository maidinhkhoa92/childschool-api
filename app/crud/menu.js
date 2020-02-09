"use strict";

const menu = require("../models/menu");
const _ = require("lodash");

module.exports.create = body => {
  return new Promise((resolve, reject) => {
    menu.create(body, function(err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(convertData(data));
    });
  });
};

module.exports.list = (paged, limit, params = {}) => {
  return new Promise((resolve, reject) => {
    var query = menu.find(params);

    if (limit) {
      query = query.limit(limit);
    }

    if (paged) {
      const skiped = (paged - 1) * limit;
      query = query.skip(skiped);
    }

    query.populate("directorId").exec(function(err, data) {
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
    menu
      .findById(id)
      .populate("directorId")
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

module.exports.update = (id, body) => {
  return new Promise((resolve, reject) => {
    const query = {
      _id: id
    };

    menu.findOneAndUpdate(query, body, { new: true }, function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(convertData(data));
    });
  });
};

module.exports.remove = id => {
  return new Promise((resolve, reject) => {
    menu.remove({ _id: id }, function(err) {
      if (err) {
        reject(err);
        return;
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
