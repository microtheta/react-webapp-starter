'use strict';
module.exports = function(sequelize, DataTypes) {
	var UserPass = sequelize.define('UserCredentials', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		userId: {
			type: DataTypes.INTEGER,
			unique: true,
			references: {
				model: 'Users',
				key: 'id'
			},
			onUpdate: 'cascade',
			onDelete: 'cascade'
	  	},
		password: {
			type: DataTypes.STRING
		},
		activationToken: {
			type: DataTypes.STRING
		},
		activationTokenExpired: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}/*,
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE
		}*/
	}, {
		tableName: 'UserCredentials',
	});
	return UserPass;
};