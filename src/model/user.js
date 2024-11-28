const {
	sequelizeCtx: { sequelize },
} = require('../context');
const { DataTypes } = require('sequelize');

const user = sequelize.define(
	'user',
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'users',
		paranoid: true,
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
		deletedAt: 'deletedAt',
	},
);

module.exports = user;
