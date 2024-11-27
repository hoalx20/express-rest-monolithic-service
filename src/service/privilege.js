const _ = require('lodash');

const { failure } = require('../constant');
const { privilegeVal, pageableVal } = require('../validator');
const { privilegeRepo } = require('../repository');
const { privilegeMpr } = require('../mapper');
const ServiceExc = require('../exception');

const ensureNotExistedByName = async (name) => {
	if (await privilegeRepo.existByName(name)) throw new ServiceExc(failure.AlreadyExistedF);
};

const ensureExistedById = async (id) => {
	const old = await privilegeRepo.findById(id);
	if (_.isEmpty(old)) throw new ServiceExc(failure.NotExistedF);
	return old;
};

const save = async (creation) => {
	try {
		await privilegeVal.whenCreate(creation);
		await ensureNotExistedByName(creation.name);
		const saved = await privilegeRepo.save(creation);
		return privilegeMpr.asResponse(saved);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.SaveF);
	}
};

const findById = async (id) => {
	try {
		const queried = await privilegeRepo.findById(id);
		if (_.isNull(queried)) throw new ServiceExc(failure.FindByIdNoContentF);
		return privilegeMpr.asResponse(queried);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.FindByIdF);
	}
};

const findAll = async ({ page, size }) => {
	try {
		await pageableVal.validate({ page, size });
		const { rows: queried, paging } = await privilegeRepo.findAll({ page, size });
		if (_.isEmpty(queried)) throw new ServiceExc(failure.FindAllNoContentF);
		const response = privilegeMpr.asListResponse(queried);
		return { response, paging };
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.FindAllF);
	}
};

const findAllBy = async ({ page, size, cond }) => {
	try {
		await pageableVal.validate({ page, size });
		const { rows: queried, paging } = await privilegeRepo.findAllBy({ page, size, cond });
		if (_.isEmpty(queried)) throw new ServiceExc(failure.FindAllByNoContentF);
		const response = privilegeMpr.asListResponse(queried);
		return { response, paging };
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.FindAllByF);
	}
};

const findAllArchived = async ({ page, size }) => {
	try {
		await pageableVal.validate({ page, size });
		const { rows: queried, paging } = await privilegeRepo.findAllArchived({ page, size });
		if (_.isEmpty(queried)) throw new ServiceExc(failure.FindAllByNoContentF);
		const response = privilegeMpr.asListResponse(queried);
		return { response, paging };
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.FindAllArchivedF);
	}
};

const update = async (id, update) => {
	try {
		await privilegeVal.whenUpdate(update);
		const old = await ensureExistedById(id);
		await privilegeRepo.update(id, update);
		return privilegeMpr.asResponse(old);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.UpdateF);
	}
};

const remove = async (id) => {
	try {
		const old = await ensureExistedById(id);
		await privilegeRepo.remove(id);
		return privilegeMpr.asResponse(old);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.DeleteF);
	}
};

module.exports = {
	save,
	findById,
	findAll,
	findAllBy,
	findAllArchived,
	update,
	remove,
};
