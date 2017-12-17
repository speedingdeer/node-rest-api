import db from '../../db';

module.exports.index = async (req, res, next) => {
  try {
    var offers = await db.Offer.findAll({order: [['name', 'ASC']]})
    res.json(offers);
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }
}