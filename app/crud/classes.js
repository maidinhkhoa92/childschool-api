"use strict";

const classes = require("../models/classes");
const child = require("../models/child");
const colors = require("../helper/colors");
const _ = require("lodash");

const create = body => {
  return new Promise((resolve, reject) => {
    const randomNumber = Math.floor(Math.random() * 19);

    const data = {
      ...body,
      color: colors[randomNumber]
    };
    classes.create(data, function(err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(convertData(data));
    });
  });
};

const list = (paged, limit, params = {}) => {
  return new Promise((resolve, reject) => {
    var query = classes.find(params);

    if (limit) {
      query = query.limit(limit);
    }

    if (paged) {
      const skiped = (paged - 1) * limit;
      query = query.skip(skiped);
    }

    query.exec(function(err, data) {
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

const update = (id, body) => {
  return new Promise((resolve, reject) => {
    const query = {
      _id: id
    };

    classes.findOneAndUpdate(query, body, { new: true }, function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(convertData(data));
    });
  });
};

const detail = id => {
  return new Promise((resolve, reject) => {
    classes
      .findById(id)
      .populate([
        {
          path: "child",
          populate: [
            {
              path: "family",
              select: "-password"
            }
          ]
        },
        {
          path: "family",
          select: "-password"
        },
        {
          path: "teacher",
          select: "-password"
        }
      ])
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

const remove = id => {
  return new Promise((resolve, reject) => {
    child.remove({ _id: { $in: Classes.child } }, function(Err) {
      if (error) {
        reject(error);
        return;
      }
      classes.remove({ _id: id }, function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve({ status: "done" });
      });
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
  update,
  list,
  detail,
  remove
};
