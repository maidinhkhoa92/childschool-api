"use strict";

const firebase = require('../helper/firebase');
const _ = require("lodash");

const create = async (from_user, to_user = [], message ) => {
    const ref = firebase.collection("messages");
    let result = [];
    await _.forEach(to_user, item => {
        item.id = item._id;
        delete item._id;
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
        ref.add(params)
        .then(function(Message) {
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
