import config from '../config';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.DB.uri, config.DB.options)
};

db.Vendor = db.sequelize.import('../api/vendor/vendor.model');
db.Offer = db.sequelize.import('../api/offer/offer.model');
db.VendorsOffer = db.sequelize.import('../api/vendors_offer/vendors_offer.model');

db.Vendor.belongsToMany(db.Offer, {
  through: db.VendorsOffer,
  foreignKey: 'vendor_id',

});

db.VendorsOffer.belongsToMany(db.Vendor, {
  through: db.VendorsOffer,
  foreignKey: 'offer_id',
});

export default db;
