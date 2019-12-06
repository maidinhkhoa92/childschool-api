'use strict';

const note = require('../models/note');
const _ = require('lodash');

const list = (paged, limit, childId) => {
  return new Promise((resolve, reject) => {
    var query = note.find();

    if (limit) {
      query = query.limit(limit);
    }

    if (paged) {
      const skip = (paged - 1) * limit;
      query = query.skip(skip);
    }
    if (childId) {
      query = query.where('childId').equals(childId)
    }

    query.sort({date: -1}).populate('familyId').exec(function (err, data) {
        if (err) {
          reject(err);
          return;
        }
        
        if(data === null) {
          reject({code: 10000})
          return;
        }

        const result = {
          paged: paged,
          limit: limit,
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
      familyId: userId
    }

    note.create(data, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(convertData(data));
    });
  })
}

const update = (id, body) => {
  return new Promise((resolve, reject) => {
    const query = {
      _id: id
    };

    note.findOne(query, function (err, Note) {
      if (err) {
        reject(err);
        return
      }
      Note.time = body.time;
      Note.save();
      resolve(convertData(Note));
    });
  })
}

const remove = (id) => {
  return new Promise((resolve, reject) => {
    note.remove({_id: id}, function (err) {
      if (err) {
        reject(err);
      }
      resolve({status: 'done'});
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
  create,
  update,
  remove
}
