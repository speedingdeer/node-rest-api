import config from '../config';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.DB.uri, config.DB.options)
};

db.Vendor = db.sequelize.import('../api/vendor/vendor.model');
db.VendorsOffer = db.sequelize.import('../api/vendors_offer/vendors_offer.model');
db.VendorsBestOffer = db.sequelize.import('../api/vendors_best_offer/vendors_best_offer.model');

db.Vendor.belongsToMany(db.VendorsOffer, {
  through: db.VendorsBestOffer,
  foreignKey: 'vendor_id',
});

db.VendorsOffer.belongsToMany(db.Vendor, {
  through: db.VendorsBestOffer,
  foreignKey: 'vendors_offer_id'
});

export default db;
