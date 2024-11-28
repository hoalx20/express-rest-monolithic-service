const {
	sequelizeCtx: { sequelize },
} = require('../context');
const { DataTypes } = require('sequelize');

const privilege = sequelize.define(
	'privilege',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'privileges',
		paranoid: true,
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
		deletedAt: 'deletedAt',
	},
);

module.exports = privilege;
