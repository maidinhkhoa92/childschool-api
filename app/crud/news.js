"use strict";

const news = require("../models/news");
const child = require("../models/child");
const _ = require("lodash");
const moment = require("moment");

const create = body => {
  return new Promise((resolve, reject) => {
    news.create(body, function(err, data) {
      if (err) {
        reject(err);
        return;
      } 
      resolve(convertData(data));
    });
  });
};

const list = (date, type, child_id) => {
  return new Promise((resolve, reject) => {
    child
      .findById(child_id)
      .populate("news")
      .exec(function(err, data) {
      if (err) {
        reject(err);
        return;
      }
      const News = _.map(data.news, item => {
        const i = convertData(item);
        i.month = moment(item.time).locale('es').format('MMMM YYYY');
        i.year = moment(item.time).locale('es').format('YYYY')
        i.day = moment(item.time).format('DD/MM/YYYY')
        return i;
      });

      let result = _.groupBy(News, 'month');
      if(type === 'year') {
        result = _.groupBy(News, 'year');
        result = result[date];
        result = _.groupBy(result, 'month');
      }
      if(type === 'month') {
        result = result[date];
        result = _(result).groupBy('day').map(function(items, day) {
          return {
            day: day,
            items: _.map(items, item => item)
          };
        }).value();;
      }
      resolve(result);
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
  delete result.created_at;
  delete result.updated_at
  delete result._id;
  delete result.__v;
  return result;
};
module.exports = {
    create,
    list
}