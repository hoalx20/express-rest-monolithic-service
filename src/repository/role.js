const { Op } = require('sequelize');

const { roleMdl, privilegeMdl } = require('../model');

const existByName = async (name) => (await roleMdl.count({ paranoid: true, where: { name } })) > 0;

const save = async (model) => await roleMdl.create(model);

const findById = async (id) =>
	await roleMdl.findByPk(id, {
		include: {
			model: privilegeMdl,
			through: { attributes: [] },
			attributes: ['name', 'description'],
			as: 'privileges',
		},
	});

const findAllById = async (ids) => await roleMdl.findAll({ where: { id: { [Op.in]: ids } } });

const findAll = async ({ page, size }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await roleMdl.findAndCountAll({
		limit: size,
		offset,
		include: {
			model: privilegeMdl,
			through: { attributes: [] },
			attributes: ['name', 'description'],
			as: 'privileges',
		},
		distinct: true,
	});
	const paging = { page, totalPage: Math.trunc(count / size) + 1, totalRecord: count };
	return { rows, paging };
};

const findAllBy = async ({ page, size, cond }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await roleMdl.findAndCountAll({
		limit: size,
		offset,
		where: { ...cond },
		include: {
			model: privilegeMdl,
			through: { attributes: [] },
			attributes: ['name', 'description'],
			as: 'privileges',
		},
		distinct: true,
	});
	const paging = { page, totalPage: Math.trunc(count / size) + 1, totalRecord: count };
	return { rows, paging };
};

const findAllArchived = async ({ page, size }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await roleMdl.findAndCountAll({
		limit: size,
		offset,
		where: { deletedAt: { [Op.not]: null } },
		include: {
			model: privilegeMdl,
			through: { attributes: [] },
			attributes: ['name', 'description'],
			as: 'privileges',
		},
		paranoid: false,
		distinct: true,
	});
	const paging = { page, totalPage: Math.trunc(count / size) + 1, totalRecord: count };
	return { rows, paging };
};

const update = async (id, update) => await roleMdl.update(update, { where: { id, individualHooks: true } });

const remove = async (id) => await roleMdl.destroy({ where: { id } });

module.exports = {
	existByName,
	save,
	findById,
	findAllById,
	findAll,
	findAllBy,
	findAllArchived,
	update,
	remove,
};
