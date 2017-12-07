export default function(sequelize, DataTypes) {
  return sequelize.define('Vendor', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    // Maybe it should be the selected dishes with some comment option as separate table but I'll leave as string for now
    recommended: DataTypes.STRING,
    // @TODO: Add slug
    // no s3, no uri, just uploads and realative path to that for now
    teaser_picture: DataTypes.STRING,
    logo: DataTypes.STRING,
  });
}