// Selected best vendors offer (Eg. Pasta, Lunch etc.)

export default function(sequelize, DataTypes) {
  // The unique constraint doesn't work as expected on sqlite (sqlite doesn't support combined keys)
  // it works fine with postgres
  // Sequalize try to use foreign keys as combined primiary key

  return sequelize.define('VendorsOffer', {

    // the Id muse be given explicitly, otherwise it uses combined key
    // which is fine hen it doesn't run on test / development
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

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
