"use strict";

const child = require("../models/child");
const news = require("./news");
const _ = require("lodash");

const list = (paged, limit, id, type, class_id) => {
  return new Promise((resolve, reject) => {
    var query = child.find();

    if (limit) {
      query = query.limit(limit);
    }

    if (paged) {
      const skip = (paged - 1) * limit;
      query = query.skip(skip);
    }

    if(type && type === 'family') {
      query = query.where('family').equals(id)
    }

    if(class_id) {
      query = query.where('classes').equals(class_id)
    }

    query.sort({date: -1}).exec(function (err, data) {
      if (err) {
        reject(err);
      }
      if(data === null) {
        reject({code: 10000})
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
  });
};

const create = body => {
  return new Promise((resolve, reject) => {
    child.create(body, function(err, data) {
      if (err) {
        reject(err);
      } 
      resolve(convertData(data));
    });
  });
};

const update = (id, profile) => {
  return new Promise((resolve, reject) => {
    const query = {
      _id: id,
    };
    const data = {
      profile
    }
    child.findOneAndUpdate(query, data, { new: true }, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(convertData(data));
    });
  })
}

const detail = (id) => {
  return new Promise((resolve, reject) => {
    child.findOne({_id: id}).populate('news').exec(function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(convertData(data));
    });
  })
}

const updateNews = (body, ids_child) => {
  return new Promise((resolve, reject) => {
    child.find().where('_id').in(ids_child).exec((error, Childs) => {
      if(error) {
        reject(error);
        return;
      }
      if(Childs.length === 0){
        reject({code: 10000})
        return;
      }
      news.create(body).then(async data =>{
        const news_id = data.id;
        const new_childs = await _.map(Childs, item => {
          let pre_news = item.news;
          let sleeping = item.sleeping;
          let result = {};
          pre_news.unshift(news_id);
          item.news = pre_news;
          if(body.type === 'Siesta') {
            sleeping = body.group === 'Durmiendo' ? true : false;
          }
          item.sleeping = sleeping;
          item.save();
          return convertData(item);
        })
        resolve(new_childs);
      }).catch(err => {
        reject(err)
      })
    });
  })
}

const updateStatus = (body, child_id) => {
  return new Promise((resolve, reject) => {
    const status = body.group === 'Durmiendo' ? true : false;
    child.findOne().where('_id').equals(child_id).exec((error, Child) => {
      if(error) {
        reject(error);
        return;
      }
      news.create(body).then(async data =>{
        const news_id = data.id;
        let pre_news = Child.news;
        pre_news.unshift(news_id);
        Child.news = pre_news;
        Child.sleeping = status
        Child.save();
        resolve(Child);
      }).catch(err => {
        reject(err)
      })
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
  };

module.exports = {
    create,
    list,
    detail,
    update,
    updateNews,
    updateStatus
}