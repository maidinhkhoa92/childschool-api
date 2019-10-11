'use strict';

const classes = require('../models/classes');
const child = require('../models/child');
const colors = require('../helper/colors');
const _ = require('lodash');

const list = (paged, limit, userId) => {
  return new Promise((resolve, reject) => {
    var query = classes.find();

    if (userId) {
      query = query.where('directorId').equals(userId)
    }

    if (limit) {
      query = query.limit(limit);
    }

    if (paged) {
      const skiped = (paged - 1) * limit;
      query = query.skip(skiped);
    }

    query.exec(function(err, data) {
      if(err) {
        reject(err)
      }
      if(data === null) {
        reject({code: 10000})
      }
      const result = _.map(data, item => {
        return convertData(item);
      })
  
      resolve({
        total: result.length,
        limit: limit,
        paged: paged,
        data: result
      });
    })
  })
}

const create = (userId, body) => {
  return new Promise((resolve, reject) => {
    const randomNumber = Math.floor(Math.random() * 19);

    const data = {
      ...body,
      color: colors[randomNumber],
      directorId: userId
    }

    classes.create(data, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(convertData(data));
    });
  })
}

const update = (id, userId, body) => {
  return new Promise((resolve, reject) => {
    const query = {
      _id: id,
      directorId: userId
    };
    const data = body;

    classes.findOneAndUpdate(query, data, { new: true }, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(convertData(data));
    });
  })
}

const detail = (id, userId) => {
  return new Promise((resolve, reject) => {
    var query = classes.findOne();

    query = query.where('_id').equals(id);

    if(userId) {
      query = query.where('directorId').equals(userId);
    }

    query.populate('child').exec(function(err, data) {
      if (err) {
        reject(err);
      }
      if(data === null) {
        reject({code: 10000})
      }
      resolve(convertData(data));
    });
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    classes.remove({_id: id}, function (err) {
      if (err) {
        reject(err);
      }
      resolve({status: 'done'});
    });
  })
}

const addClass = (id, childId, teacher_id_1, teacher_id_2, family_id) => {
  return new Promise((resolve, reject) => {
    classes.findById(id, function (err, Classes) {
      if(err) {
        reject(err);
        return;
      }
      var child_classes = Classes.child;
      child_classes.push(childId);
      Classes.child = child_classes;

      // check if teacher or family exist
      if(!_.includes(Classes.teacher, teacher_id_1)) {
        Classes.teacher.push(teacher_id_1)
      }
      if(!_.includes(Classes.teacher, teacher_id_2)) {
        Classes.teacher.push(teacher_id_2)
      }
      if(!_.includes(Classes.teacher, family_id)) {
        Classes.family.push(teacher_id_1)
      }

      Classes.save();
      child.findById(childId, function (e, Child) {
        if(e) {
          reject(e);
          return;
        }
        Child.classes = id;
        Child.save();
        Classes.populate('child', function (error, result) {
          if(error) {
            reject(error)
          }
          resolve(convertData(result));
        })
      })
    })
  });
}

const removeClass = (classId, childId) => {
  return new Promise((resolve, reject) => {
    classes.findById(classId, function(err, Classes) {
      if(err) {
        reject(err)
      }

      var child = Classes.child;
      Classes.child = _.filter(child, item => {
        return item != childId
      })

      resolve(convertData(Classes.save()));
    })
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
  create,
  update,
  list,
  detail,
  remove,
  addClass,
  removeClass
}
