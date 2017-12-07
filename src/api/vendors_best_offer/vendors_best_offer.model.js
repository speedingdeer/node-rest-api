// Selected best vendors offer (Eg. Pasta, Lunch etc.)

export default function(sequelize, DataTypes) {
  // @TODO:
  // the unique constraint doesn't work as expected on sqlite
  // since it's very much WIP it's disabled for now
  return sequelize.define('VendorsBestOffer', {
    vendor_id: {
      type: DataTypes.INTEGER,
      // unique: 'vendors_selected_best_offer'
    },
    vendors_offer_id: {
      type: DataTypes.STRING,
      // unique: 'vendors_selected_best_offer'
    },
  });
}
