import db from '../../db';

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

module.exports.index = function(req, res) {
  db.Vendor.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
}