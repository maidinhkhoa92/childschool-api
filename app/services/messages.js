"use strict";

const firebase = require('../helper/firebase');
const _ = require("lodash");
const moment = require("moment");
const ref = firebase.collection("messages");

const create = async (from, to_something, message ) => {
    let result = [];
    const time = moment(new Date()).format("DD/MM/YYYY");

    await _.forEach(to_something, to => {
        const params = {
            from: from,
            to: to,
            messages: [
                {
                    ...from,
                    message: message
                }
            ],
            time: time
        }
        ref.add(params)
        .then(async Message => {
            result.push(Message)
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    })
    
    return result;
};

module.exports = {
    create
}
