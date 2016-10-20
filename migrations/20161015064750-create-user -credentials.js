'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('UserCredentials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
            model: 'Users',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      activationToken: {
        type: Sequelize.STRING
      },
      activationCreatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      activationTokenExpired: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      passwordResetToken: {
        type: Sequelize.STRING
      },
      passwordResetTokenCreatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      passwordResetTokenExpired: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('UserCredentials');
  }
};