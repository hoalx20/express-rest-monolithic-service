const { Op } = require('sequelize');

const { userMdl, roleMdl, privilegeMdl } = require('../model');

const existByUsername = async (username) => (await userMdl.count({ paranoid: true, where: { username } })) > 0;

const save = async (model) => await userMdl.create(model);

const findById = async (id) =>
	await userMdl.findByPk(id, {
		include: {
			model: roleMdl,
			include: {
				// @ts-ignore
				model: privilegeMdl,
				through: { attributes: [] },
				attributes: ['name', 'description'],
				as: 'privileges',
			},
			through: { attributes: [] },
			attributes: ['name', 'description'],
			as: 'roles',
		},
	});

const findByUsername = async (username) =>
	await userMdl.findOne({
		where: { username },
		include: {
			model: roleMdl,
			include: {
				// @ts-ignore
				model: privilegeMdl,
				through: { attributes: [] },
				attributes: ['name', 'description'],
				as: 'privileges',
			},
			through: { attributes: [] },
			attributes: ['name', 'description'],
			as: 'roles',
		},
	});

const findAllById = async (ids) => await userMdl.findAll({ where: { id: { [Op.in]: ids } } });

const findAll = async ({ page, size }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await userMdl.findAndCountAll({
		limit: size,
		offset,
		include: {
			model: roleMdl,
			include: {
				// @ts-ignore
				model: privilegeMdl,
				through: { attributes: [] },
				attributes: ['name', 'description'],
				as: 'privileges',
			},
			through: { attributes: [] },
			attributes: ['name', 'description'],
			as: 'roles',
		},
		distinct: true,
	});
	const paging = { page, totalPage: Math.trunc(count / size) + 1, totalRecord: count };
	return { rows, paging };
};

const findAllBy = async ({ page, size, cond }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await userMdl.findAndCountAll({
		limit: size,
		offset,
		where: { ...cond },
		include: {
			model: roleMdl,
			include: {
				// @ts-ignore
				model: privilegeMdl,
				through: { attributes: [] },
				attributes: ['name', 'description'],
				as: 'privileges',
			},
			through: { attributes: [] },
			attributes: ['name', 'description'],
			as: 'roles',
		},
		distinct: true,
	});
	const paging = { page, totalPage: Math.trunc(count / size) + 1, totalRecord: count };
	return { rows, paging };
};

const findAllArchived = async ({ page, size }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await userMdl.findAndCountAll({
		limit: size,
		offset,
		where: { deletedAt: { [Op.not]: null } },
		include: {
			model: roleMdl,
			include: {
				// @ts-ignore
				model: privilegeMdl,
				through: { attributes: [] },
				attributes: ['name', 'description'],
				as: 'privileges',
			},
			through: { attributes: [] },
			attributes: ['name', 'description'],
			as: 'roles',
		},
		paranoid: false,
		distinct: true,
	});
	const paging = { page, totalPage: Math.trunc(count / size) + 1, totalRecord: count };
	return { rows, paging };
};

const update = async (id, update) => await userMdl.update(update, { where: { id }, individualHooks: true });

const remove = async (id) => await userMdl.destroy({ where: { id } });

module.exports = {
	existByUsername,
	save,
	findById,
	findByUsername,
	findAllById,
	findAll,
	findAllBy,
	findAllArchived,
	update,
	remove,
};
