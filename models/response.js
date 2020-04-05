module.exports = (sequelize, DataTypes) => {
  const Response = sequelize.define('Response', {
    testId: DataTypes.INTEGER,
    fromId: DataTypes.INTEGER,
    fromName: DataTypes.STRING,
    answer: DataTypes.STRING,
    score: DataTypes.INTEGER,
  }, {});
  Response.associate = (models) => {
    Response.belongsTo(models.Test, { as: 'test', foreignKey: 'testId' });
  };
  return Response;
};
