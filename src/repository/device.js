const { Op } = require('sequelize');

const { deviceMdl, userMdl } = require('../model');

const existByIpAddress = async (ipAddress) => (await deviceMdl.count({ paranoid: true, where: { ipAddress } })) > 0;

const save = async (model) => await deviceMdl.create(model);

const findById = async (id) =>
	await deviceMdl.findByPk(id, {
		include: {
			model: userMdl,
			attributes: ['username'],
			as: 'user',
		},
	});

const findAllById = async (ids) => await deviceMdl.findAll({ where: { id: { [Op.in]: ids } } });

const findAll = async ({ page, size }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await deviceMdl.findAndCountAll({
		limit: size,
		offset,
		include: {
			model: userMdl,
			attributes: ['username'],
			as: 'user',
		},
		distinct: true,
	});
	const paging = { page, totalPage: Math.trunc(count / size) + 1, totalRecord: count };
	return { rows, paging };
};

const findAllBy = async ({ page, size, cond }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await deviceMdl.findAndCountAll({
		limit: size,
		offset,
		where: { ...cond },
		include: {
			model: userMdl,
			attributes: ['username'],
			as: 'user',
		},
		distinct: true,
	});
	const paging = { page, totalPage: Math.trunc(count / size) + 1, totalRecord: count };
	return { rows, paging };
};

const findAllArchived = async ({ page, size }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await deviceMdl.findAndCountAll({
		limit: size,
		offset,
		where: { deletedAt: { [Op.not]: null } },
		include: {
			model: userMdl,
			attributes: ['username'],
			as: 'user',
		},
		paranoid: false,
		distinct: true,
	});
	const paging = { page, totalPage: Math.trunc(count / size) + 1, totalRecord: count };
	return { rows, paging };
};

const update = async (id, update) => await deviceMdl.update(update, { where: { id } });

const remove = async (id) => await deviceMdl.destroy({ where: { id } });

module.exports = {
	existByIpAddress,
	save,
	findById,
	findAllById,
	findAll,
	findAllBy,
	findAllArchived,
	update,
	remove,
};
