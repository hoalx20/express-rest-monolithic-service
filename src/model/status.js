const {
	sequelizeClt: { sequelize, DataTypes },
} = require('../client');

const status = sequelize.define(
	'status',
	{
		content: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'statuses',
		paranoid: true,
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
		deletedAt: 'deletedAt',
	},
);

module.exports = status;
