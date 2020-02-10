"use strict";

const news = require("../models/news");
const child = require("../models/child");
const _ = require("lodash");

module.exports.remove = (child_id, news_id) => {
  return new Promise((resolve, reject) => {
    child.findById(child_id, (err, Child) => {
      if (err) {
        reject(err);
      }
      Child.news = _.filter(Child.news, item => item._id !== news_id);
      Child.save();
      news.remove({ _id: news_id }, function(error) {
        if (error) {
          reject(error);
        }
        resolve({ status: "done" });
      });
    });
  });
};
