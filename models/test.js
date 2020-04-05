module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    userId: DataTypes.INTEGER,
    answerKey: DataTypes.STRING,
    isPublic: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    finishedAt: DataTypes.DATE,
  }, {});
  Test.associate = (models) => {
    Test.hasMany(models.Response, { as: 'responses', foreignKey: 'testId' });
  };
  return Test;
};
