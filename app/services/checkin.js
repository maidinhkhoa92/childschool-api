"use strict";

const checkin = require("../models/checkin");

module.exports.createOrUpdate = (body) => {
  return new Promise((resolve, reject) => {
    var query = body;
    checkin.findOne({ date: body.date, classes: body.classes }, function (err, Checkin) {
      if(err) {
        reject(err);
        return;
      }
      if(Checkin === null) {
        const newCheckin = new checkin(query);
        newCheckin.save();
        resolve(convertData(newCheckin));
        return
      }
      resolve(convertData(Checkin));
    });
  });
};

module.exports.update = (id, body) => {
  return new Promise((resolve, reject) => {
    const query = {
      _id: id,
    };
    
    checkin.findOneAndUpdate(query, body, { new: true }, function (err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(convertData(data));
    });
  })
}

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