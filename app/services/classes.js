'use strict';

const classes = require('../models/classes');
const child = require('../models/child');
const user = require('../models/user');
const colors = require('../helper/colors');
const _ = require('lodash');

const list = (paged, limit, userId, type = "director") => {
  return new Promise((resolve, reject) => {
    var query = classes.find();
    if (userId && type === "director") {
      query = query.where('directorId').equals(userId)
    }

    if (userId && type === "family") {
      query = query.where('family').in([userId])
    }

    if (userId && type === "staff") {
      query = query.where('teacher').in([userId])
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
    user.find({directorId: userId, status: true}, function(error, staffs) {
      if (error) {
        reject(error);
        return
      }
      data.teacher = _.map(staffs, item => item._id);
      classes.create(data, function (err, data) {
        if (err) {
          reject(err);
          return
        }
        resolve(convertData(data));
      });
    })
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

const detail = (id, userId, type = "director") => {
  return new Promise((resolve, reject) => {
    var query = classes.findOne();

    query = query.where('_id').equals(id);

    if(userId && type === "director") {
      query = query.where('directorId').equals(userId);
    }

    if (userId && type === "family") {
      query = query.where('family').in([userId])
    }

    if (userId && type === "staff") {
      query = query.where('teacher').in([userId])
    }

    query.populate([
      {
        path: 'child',
        populate : [{
          path : 'family',
          select: '-password'
        }]
      },
      {
        path: 'family',
        select: '-password'
      },
      {
        path: 'teacher',
        select: '-password'
      }
    ]).exec(function(err, data) {
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
    classes.findById(id, function(error, Classes) {
      if(error) {
        reject(error);
        return;
      }
      child.remove({_id: {$in: Classes.child}}, function(Err) {
        if(error) {
          reject(error);
          return;
        }
        classes.remove({_id: id}, function (err) {
          if (err) {
            reject(err);
            return;
          }
          resolve({status: 'done'});
        });
      })
    })
  })
}

const addClass = (id, childId, teacher_id_1, teacher_id_2, family_id) => {
  return new Promise((resolve, reject) => {
    classes.findById(id, function (err, Classes) {
      if(err) {
        reject(err);
        return;
      }

      if(Classes === null) {
        reject({code: 10000})
        return;
      }

      let child_classes = Classes.child;
      let teacher_classes = Classes.teacher;
      let family_classes = Classes.family;
      child_classes.push(childId);
      
      Classes.child = child_classes;

      // check if teacher or family exist
      // if(!_.includes(teacher_classes.toString(), teacher_id_1)) {
      //   teacher_classes.push(teacher_id_1)
      //   Classes.teacher = teacher_classes
      // }
      // if(!_.includes(teacher_classes.toString(), teacher_id_2)) {
      //   teacher_classes.push(teacher_id_2)
      //   Classes.teacher = teacher_classes
      // }
      if(_.includes(family_classes, family_id) === -1) {
        family_classes.push(family_id)
        Classes.family = family_classes
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
        reject(err);
        return;
      }

      var childClasses = Classes.child;
      Classes.child = _.filter(childClasses, item => {
        return item != childId
      })
      Classes.save()

      child.deleteOne({ _id: childId }, function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(convertData(Classes));
      });
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
