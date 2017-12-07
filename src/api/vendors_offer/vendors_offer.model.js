// it's an enum in fact (Eg. pasta, Lunch and other keywardss)
export default function(sequelize, DataTypes) {
  return sequelize.define('VendorsOffer', {
    name: DataTypes.STRING,
  });
}
