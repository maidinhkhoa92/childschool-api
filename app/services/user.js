"use strict";

const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require('../config/nodemailer');
const parameters = require('../config/parameters.json');
const _ = require('lodash');

const create = (body, directorId) => {
  return new Promise((resolve, reject) => {
    if(directorId) {
      body.directorId = directorId;
    }
    user.create(body, function(err, data) {
      if (err) {
        reject(err);
        return;
      } 
      const mailOptions = {
        from: 'admin@gmail.com',
        to: data.email,
        subject: 'Your new account',
        text: "Your link: " + parameters.registerWebAppUrl
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (err) {
          reject(error);
          return;
        } 

        resolve(convertData(data));
      })
    });
  });
};

const updatePassword = (email, password, confirm) => {
  return new Promise((resolve, reject) => {
    if (password !== confirm) {
      reject({ code: 4 });
      return;
    }
    user.findOne({ email: email }, function(err, User) {
      if (err) {
        reject(err);
        return;
      }

      if (User === null || User === undefined) {
        reject({ code: 8 });
        return;
      }

      if (User.active !== "New") {
        reject({ code: 5 });
        return;
      }

      User.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      User.active = "Pass confirmed";
      User.save();
      resolve(convertData(User));
    });
  });
};

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    user
      .findOne({ email: email }, function(error, User) {
        if (error) {
          reject(error);
          return
        }

        if (User === null || User === undefined) {
          reject({ code: 8 });
          return;
        }

        if (User.active === "New") {
          reject({ code: 6 });
          return
        }

        if (User.status === false) {
          reject({ code: 6 });
          return
        }

        bcrypt.compare(password, User.password, (err, resonse) => {
          if (err) {
            reject(err);
            return
          }
          if (!resonse) {
            reject({ code: 9999 });
            return
          }

          delete User.password;
          const data = {
            type: User.typeOfUser,
            email: User.email,
            id: User._id
          };
          const token = jwt.sign(data, "token_token_miracles");
          resolve({ ...convertData(User), token: token });
        });
      })
      .catch(err => {
        reject({ code: 9999 });
      });
  });
};

const updateDigit = (id, digit) => {
  return new Promise((resolve, reject) => {
    user.findById(id, function(error, User) {
      if (error) {
        reject(error);
        return;
      }

      if (User === null || User === undefined) {
        reject({ code: 8 });
        return;
      }

      if (User.active !== "Pass confirmed") {
        reject({ code: 5 });
        return;
      }

      User.digit = digit;
      User.active = "Digit confirmed";
      User.save();
      resolve(convertData(User));
    });
  });
};

const compareDigit = (id, digit) => {
  return new Promise((resolve, reject) => {
    user.findById(id, function(error, User) {
      if (error) {
        reject(error);
        return;
      }

      if (User === null || User === undefined) {
        reject({ code: 8 });
        return;
      }

      if (User.active !== "Digit confirmed") {
        reject({ code: 5 });
        return;
      }

      if (JSON.stringify(digit) !== JSON.stringify(User.digit)) {
        reject({ code: 7 });
        return;
      }

      resolve(convertData(User));
    });
  });
};

const update = (id, body) => {
  return new Promise((resolve, reject) => {
    const query = {
      _id: id
    }
    
    user.findOneAndUpdate(query, body, { new: true }, function(err, data) {
      if (err) {
        reject(err);
      }
      
      resolve(convertData(data));
    });
  });
};

const list = (paged, limit) => {
  return new Promise((resolve, reject) => {
    var query = user.find();

    if (limit) {
      query = query.limit(limit);
    }

    if (paged) {
      const skip = paged * limit;
      query = query.skip(skip);
    }

    query.sort({date: -1}).exec(function (err, data) {
      if (err) {
        reject(err);
      }
      if(data === null) {
        reject({code: 10000})
      }
      user.count({}, function( err, count){
        const result = {
          paged: paged,
          limit: limit,
          total: count,
          data: _.map(data, item => {
            return convertData(item)
          })
        }
        resolve(result);
      })
    });
  });
};

const detail = id => {
  return new Promise((resolve, reject) => {
    user.findById(id, function(err, data) {
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

const remove = id => {
  return new Promise((resolve, reject) => {
    user.remove({ _id: id }, function(err) {
      if (err) {
        reject(err);
      }
      resolve({status: 'done'});
    });
  });
};

const findByEmailAndCreate = (body, directorId = null) => {
  return new Promise((resolve, reject) => {
    user.findOne({email: body.email}, function(err, data) {
      if(err){
        reject(err)
        return;
      }
      if(data === null) {
        body.directorId = directorId;
        create(body).then(item => {
          resolve(item)
        })
      } else {
        resolve(convertData(data));
      }
    })
  })
}

const center = (id, type = null) => {
  return new Promise((resolve, reject) => {
    var query = user.find();

    query = query.where('directorId').equals(id);

    query = query.where('status').equals(true);

    if(type !== null) {
      query = query.where('typeOfUser').equals(type);
    }

    query.exec(function (err, data) {
      if (err) {
        reject(err);
        return;
      }
      if(data === null) {
        reject({code: 10000})
        return;
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

const changeDigit = (id, oldDigit, newDigit, confirmDigit) => {
  return new Promise((resolve, reject) => {
    user.findById(id, function(error, User) {
      if (error) {
        reject(error);
        return;
      }

      if (User === null || User === undefined) {
        reject({ code: 8 });
        return;
      }

      if (User.active !== "Digit confirmed") {
        reject({ code: 5 });
        return;
      }

      if (JSON.stringify(User.digit) !== JSON.stringify(oldDigit)) {
        reject({code: 7});
        return;
      }

      if (JSON.stringify(newDigit) !== JSON.stringify(confirmDigit)) {
        reject({code: 9});
        return;
      }

      User.digit = newDigit;
      User.save();
      resolve(convertData(User));
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

module.exports = {
  create,
  updatePassword,
  login,
  updateDigit,
  compareDigit,
  update,
  list,
  detail,
  remove,
  findByEmailAndCreate,
  center,
  changeDigit
};
