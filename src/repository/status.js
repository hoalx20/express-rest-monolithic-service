const { Op } = require('sequelize');

const { statusMdl, userMdl } = require('../model');

const save = async (model) => await statusMdl.create(model);

const findById = async (id) =>
	await statusMdl.findByPk(id, {
		include: {
			model: userMdl,
			attributes: ['username'],
			as: 'user',
		},
	});

const findByUserId = async (userId) =>
	await statusMdl.findOne({
		where: { userId },
		include: {
			model: userMdl,
			attributes: ['username'],
			as: 'user',
		},
	});

const findAllById = async (ids) => await statusMdl.findAll({ where: { id: { [Op.in]: ids } } });

const findAll = async ({ page, size }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await statusMdl.findAndCountAll({
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
	const { rows, count } = await statusMdl.findAndCountAll({
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
	const { rows, count } = await statusMdl.findAndCountAll({
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

const update = async (id, update) => await statusMdl.update(update, { where: { id } });

const remove = async (id) => await statusMdl.destroy({ where: { id } });

module.exports = {
	save,
	findById,
	findByUserId,
	findAllById,
	findAll,
	findAllBy,
	findAllArchived,
	update,
	remove,
};
