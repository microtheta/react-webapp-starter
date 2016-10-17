'use strict';
module.exports = function(sequelize, DataTypes) {
	var UserPass = sequelize.define('UserPassword', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		userId: {
			type: DataTypes.INTEGER,
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
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE
		}
	}, {
		tableName: 'UserPassword',
	});
	return UserPass;
};