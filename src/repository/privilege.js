const { Op } = require('sequelize');

const { privilegeMdl } = require('../model');

const existByName = async (name) => (await privilegeMdl.count({ paranoid: true, where: { name } })) > 0;

const save = async (model) => await privilegeMdl.create(model);

const findById = async (id) => await privilegeMdl.findByPk(id);

const findAllById = async (ids) => await privilegeMdl.findAll({ where: { id: { [Op.in]: ids } } });

const findAll = async ({ page, size }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await privilegeMdl.findAndCountAll({ limit: size, offset, distinct: true });
	const paging = { page, totalPage: Math.trunc(count / size) + 1, totalRecord: count };
	return { rows, paging };
};

const findAllBy = async ({ page, size, cond }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await privilegeMdl.findAndCountAll({ limit: size, offset, where: { ...cond } });
	const paging = { page, totalPage: Math.trunc(count / size) + 1, totalRecord: count };
	return { rows, paging };
};

const findAllArchived = async ({ page, size }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await privilegeMdl.findAndCountAll({ limit: size, offset, where: { deletedAt: { [Op.not]: null } }, paranoid: false });
	const paging = { page, totalPage: Math.trunc(count / size) + 1, totalRecord: count };
	return { rows, paging };
};

const update = async (id, update) => await privilegeMdl.update(update, { where: { id, individualHooks: true } });

const remove = async (id) => await privilegeMdl.destroy({ where: { id } });

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
