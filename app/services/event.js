"use strict";

const event = require("../models/event");
const _ = require("lodash");
const moment = require("moment");

const list = (paged, limit, class_id, time) => {
  return new Promise((resolve, reject) => {
    var query = event.find();

    if (limit) {
      query = query.limit(limit);
    }

    if (paged) {
      const skip = (paged - 1) * limit;
      query = query.skip(skip);
    }

    if (class_id) {
      query = query.where("group").equals(class_id);
    }

    if (time) {
      const startTime = moment(time).startOf('month');
      const endTime = moment(time).endOf('month');
      query = query.where("date").gte(startTime).lte(endTime);
    }

    query.sort({ date: -1 }).populate('group').exec(function(err, data) {
      if (err) {
        reject(err);
        return;
      }

      if (data === null) {
        reject({ code: 10000 });
        return;
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

const create = body => {
  return new Promise((resolve, reject) => {
    event.create(body, function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(convertData(data));
    });
  });
};

const update = (id, body) => {
  return new Promise((resolve, reject) => {
    event.findByIdAndUpdate(id, body, { new: true }, function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(convertData(data));
    });
  });
};

const remove = id => {
  return new Promise((resolve, reject) => {
    event.remove({ _id: id }, function(err) {
      if (err) {
        reject(err);
      }
      resolve({ status: "done" });
    });
  });
};

const detail = id => {
  return new Promise((resolve, reject) => {
    console.log(id)
    event.findById(id, function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(convertData(data));
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
  list,
  create,
  update,
  remove,
  detail
};
