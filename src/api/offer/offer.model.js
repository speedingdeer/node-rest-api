// it's an enum in fact (Eg. pasta, Lunch and other keywardss)
export default function(sequelize, DataTypes) {
  return sequelize.define('Offer', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
    // @TODO: Add slug
  });
}
