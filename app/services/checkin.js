"use strict";

const checkin = require("../models/checkin");

module.exports.createOrUpdate = (body) => {
  return new Promise((resolve, reject) => {
    var query = body,
        update = { expire: new Date() },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        checkin.findOneAndUpdate(query, update, options, function(error, result) {
            if (error) {
                reject(error);
                return;
            }
            
            resolve(convertData(result))
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