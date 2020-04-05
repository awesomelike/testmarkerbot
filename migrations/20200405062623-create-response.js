module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Responses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    testId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Tests',
        key: 'id',
      },
    },
    fromId: {
      type: Sequelize.INTEGER,
    },
    fromName: {
      type: Sequelize.STRING,
    },
    answer: {
      type: Sequelize.STRING,
    },
    score: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Responses'),
};
