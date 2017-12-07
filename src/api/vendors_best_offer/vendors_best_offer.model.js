// Selected best vendors offer (Eg. Pasta, Lunch etc.)

export default function(sequelize, DataTypes) {
  return sequelize.define('VendorsOffer', {
    vendor_id: {
      type: DataTypes.INTEGER,
      unique: 'vendors_selected_best_offer'
    },
    vendors_offer_id: {
      type: DataTypes.STRING,
      unique: 'vendors_selected_best_offer'
    },
  });
}
