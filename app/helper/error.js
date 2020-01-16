const error_data = require('./error.json');
module.exports = function (err, req, res, next) {
  if (err.name === "ValidationError") {
    if( err.errors[0].messages[0] === '"secondTeacher" contains an invalid value'){
      res.boom.badRequest('el tutor está repetido')
    } if( err.errors[0].messages[0] === '"time" is not allowed to be empty'){ 
      res.boom.badRequest('Selecciona la hora')
    } if( err.errors[0].messages[0] === '"title" is not allowed to be empty' && req.body.news.type === "Medicines"){ 
      res.boom.badRequest('Falta el nombre de la medicina')
    } if( err.errors[0].messages[0] === '"title" is not allowed to be empty' && req.body.news.type === "Incidents"){ 
      res.boom.badRequest('Diga el tipo de incidente')
    } else {
      res.boom.badRequest(err.errors[0].messages[0]);
    }
  } else {
    
    if(err.code === 11000) {
      const result = error_data[err.code];
      res.boom.conflict(result);
    } else {
      const result = error_data[err.code];
      res.boom[result.method](result.msg);
    }
  }
}
