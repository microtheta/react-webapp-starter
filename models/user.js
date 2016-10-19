'use strict';
module.exports = function(sequelize, DataTypes) {
	var Users = sequelize.define('Users', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		firstName: {
			type: DataTypes.STRING
		},
		lastName: {
			type: DataTypes.STRING
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		email: {
			unique: true,
			type: DataTypes.STRING
		},
		isEmailVerified: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE
		}
	}, {
		tableName: 'Users',
	});
	return Users;
};