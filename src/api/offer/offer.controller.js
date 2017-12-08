import util from '../util';
import db from '../../db';

module.exports.index = function(req, res) {
  db.Offer.findAll({order: [['name', 'ASC']]})
    .then(util.responseWithResult(res))
    .catch(util.handleError(res));
}