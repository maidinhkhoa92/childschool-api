'use strict';

const menu = require('../models/menu');
const _ = require('lodash');

const list = (userId) => {
  return new Promise((resolve, reject) => {
    var query = menu.find();

    if(userId) {
      query = query.where('directorId').equals(userId)
    }

    query.sort({date: -1}).exec(function (err, data) {
        if (err) {
          reject(err);
        }
        
        if(data === null) {
          reject({code: 10000})
        }

        const result = {
          total: data.length,
          data: _.map(data, item => {
            return convertData(item)
          })
        }

        resolve(result);
    });
  })
}

const create = (userId, body) => {
  return new Promise((resolve, reject) => {
    const data = {
      ...body,
      directorId: userId
    }

    menu.create(data, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(convertData(data));
    });
  })
}

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
}

module.exports = {
  list,
  create
}
