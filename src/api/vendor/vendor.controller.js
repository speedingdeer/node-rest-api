import util from '../util';
import db from '../../db';

module.exports.index = function(req, res) {
  //@TODO: the three selected could be randomized but it's probably fine if we take the three seeded now
  db.Vendor.findAll({ include: [{ model: db.Offer, attributes: ['name'] }], limit: req.query.limit || -1 })
    .then(util.responseWithResult(res))
    .catch(util.handleError(res));
}