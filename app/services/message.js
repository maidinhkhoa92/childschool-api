"use strict";

const firebase = require('../helper/firebase');
const _ = require("lodash");

const create = (from_user, to_user = [], message ) => {
  return new Promise((resolve, reject) => {
    const ref = firebase.ref('messages');
    _.forEach(to_user, item => {
        const params = {
            from_user: from_user,
            to_user: item,
            messages: [
                {
                    ...from_user,
                    message: message
                }
            ]
        }
        ref.push(params)
        resolve(params);
    })
  });
};

module.exports = {
    create
}
