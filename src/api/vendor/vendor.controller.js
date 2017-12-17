import util from '../util';
import db from '../../db';

// @TODO!
// important;
// Please do not user the callback hell if not needed
// we can easily jump on th async / await like in koa
// https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016

module.exports.index = function(req, res) {
  // @TODO: the three selected could be randomized but it's probably fine if we take the three seeded now
  db.Vendor.findAll({ include: [{ model: db.Offer, attributes: ['name', 'id'] }], limit: req.query.limit || -1 })
    .then(util.responseWithResult(res))
    .catch(util.handleError(res));
}

module.exports.get = function(req, res) {
  db.Vendor.findById(req.params.id, { include: [{ model: db.Offer, attributes: ['name', 'id'] }] })
    .then(util.responseWithResult(res))
    .catch(util.handleError(res));
}

module.exports.create = function(req, res) {
  // @TODO appropriate statuses
  // when body incomplete etc.
  db.Vendor.create(req.body)
    .then(v => {
      // @TODO; I've splitted that into two steps because { include: [db.Offer] } isn't working
      // Must look into that again
      v.setOffers(req.body.Offers || [])
        .then( () => { return v } )
        .then(util.responseWithResult(res))

    })
    .catch(util.handleError(res));
}

module.exports.update = function(req, res) {
  // @TODO add 404 etc.
  if (req.body.id) { delete req.body.id; }
  db.Vendor.findById(req.params.id)
    .then(v => {
      v.updateAttributes(req.body).then(v => {
        v.setOffers(req.body.Offers || [])
        .then( () => { return v } )
        .then(util.responseWithResult(res))
      })
    })
    .catch(util.handleError(res));
}

module.exports.destroy = function(req, res) {
  // @TODO add 404 etc.
  db.Vendor.findById(req.params.id)
    .then(v => {
      return v.destroy()
      .then(() => {
        res.status(204).end();
      });
    });
}