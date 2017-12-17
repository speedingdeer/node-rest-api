import db from '../../db';


module.exports.index = async (req, res, next) => {
  try {
    var vendors = await db.Vendor.findAll({ include: [{ model: db.Offer, attributes: ['name', 'id'] }], limit: req.query.limit || -1 })
    res.json(vendors);
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }
}

module.exports.get = async (req, res, next) => {
  try {
    var vendor = await db.Vendor.findById(req.params.id, { include: [{ model: db.Offer, attributes: ['name', 'id'] }] })
    res.json(vendor);
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }
}

module.exports.create = async (req, res, next) => {
  try {
    // @TODO appropriate statuses
    // when body incomplete etc.
    var vendor = await db.Vendor.create(req.body)
    // @TODO; I've splitted that into two steps because { include: [db.Offer] } isn't working
    // Must look into that again
    await vendor.setOffers(req.body.Offers || [])
    res.json(vendor);
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }
}

module.exports.update = async (req, res, next) => {
  // @TODO add 404 etc.
  try {
    if (req.body.id) { delete req.body.id; }
    var vendor = await db.Vendor.findById(req.params.id)
    await vendor.updateAttributes(req.body)
    await vendor.setOffers(req.body.Offers || [])
    res.json(vendor);
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }
}

module.exports.destroy = async (req, res, next) => {
  // @TODO add 404 etc.
  try {
    var vendor = await db.Vendor.findById(req.params.id)
    await vendor.destroy();
    res.status(204).end();
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }
}