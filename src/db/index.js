import config from '../config';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.DB.uri, config.DB.options)
};

db.User = db.sequelize.import('../api/user/user.model');
db.Vendor = db.sequelize.import('../api/vendor/vendor.model');
db.Offer = db.sequelize.import('../api/offer/offer.model');
db.VendorsOffer = db.sequelize.import('../api/vendors_offer/vendors_offer.model');

db.Vendor.belongsToMany(db.Offer, { through: db.VendorsOffer });
db.Offer.belongsToMany(db.Vendor, { through: db.VendorsOffer });
db.VendorsOffer.belongsTo(db.Offer)
db.VendorsOffer.belongsTo(db.Vendor)


export default db;
