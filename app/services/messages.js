"use strict";

const firebase = require('../helper/firebase');
const _ = require("lodash");
const message = require('../models/message');
const user = require("../models/user");
const ref = firebase.collection("messages");

const list = (paged, limit, userId, type = "director", classId = null) => {
  return new Promise((resolve, reject) => {
    var query = message.find();

    if (limit) {
      query = query.limit(limit);
    }

    if (paged) {
      const skiped = (paged - 1) * limit;
      query = query.skip(skiped);
    }
    
    if (type === "director") {
      query = query.where('from').equals(userId);
    }

    if (type === "family" || type === "staff") {
      query = query.or([{from: userId}, { to: { "$in" : [userId]} }, { classes: { "$in" : [classId]} }]);
    }

    query.sort({created_at: 'desc'}).populate([
      {
        path: 'from',
        select: '-password'
      },
      {
        path: 'to',
        select: '-password'
      },
      {
        path: 'classes'
      }
    ]).exec(function(err, data) {
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

const create = async (from, to, new_message, classes, type, note = "") => {
    // create new message
    const messageParams = {
        from: from,
        to: to,
        classes: classes,
        type: type,
        message: new_message,
        note: note
    }   
    const Message = new message(messageParams);
    await Message.save();
    const newNessage = await Message.populate([
      {
        path: 'from',
        select: '-password'
      },
      {
        path: 'classes'
      }
    ]).execPopulate();

    // add firebase
    let firebaseParams = {
        message: [{
            message: new_message,
            profile: newNessage.from.profile,
            typeOfUser: newNessage.from.typeOfUser,
            user_id: newNessage.from._id.toString(),
            email: newNessage.from.email
        }]
    }
    const newFirebaseMessage = await ref.add(firebaseParams)
    Message.firestore = newFirebaseMessage.id
    await Message.save()
    
    return convertData(Message);
};

const update = async (message_id, ref_id, current_message, old_message, user_id) => {
  const current_user = await user.findById(user_id);
  let updatedMessage = await message.findOneAndUpdate({_id: message_id}, {message: current_message}, { new: true });
  
  const firestoreParams = [...old_message, {
    message: current_message,
    profile: current_user.profile,
    typeOfUser: current_user.typeOfUser,
    user_id: current_user._id.toString(),
    email: current_user.email
  }]
  
  await ref.doc(ref_id).update({message: firestoreParams});
  
  return convertData(updatedMessage);
};

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
  };

module.exports = {
  list, create, update
}
