// it's an enum in fact (Eg. pasta, Lunch and other keywardss)
export default function(sequelize, DataTypes) {
  return sequelize.define('Offer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
      unique: {
        msg: 'The specified already exists.'
      }
    }
    // @TODO: Add slug
  });
}
