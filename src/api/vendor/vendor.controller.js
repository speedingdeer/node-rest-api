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
  //@TODO: the three selected could be randomized but it's probably fine if we take the three seeded now
  db.Vendor.findAll({ include: [{ model: db.Offer, attributes: ['name'] }], limit: req.query.limit || -1 })
    .then(responseWithResult(res))
    .catch(handleError(res));
}