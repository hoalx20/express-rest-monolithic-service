const {
	sequelizeCtx: { sequelize },
} = require('../context');
const { DataTypes } = require('sequelize');

const badCredential = sequelize.define(
	'badCredential',
	{
		accessTokenId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		accessTokenExpiredAt: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		tableName: 'bad_credential',
		paranoid: true,
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
		deletedAt: 'deletedAt',
	},
);

module.exports = badCredential;
