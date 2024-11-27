const _ = require('lodash');

const { failure } = require('../constant');
const { roleVal, pageableVal } = require('../validator');
const { roleRepo, privilegeRepo } = require('../repository');
const { roleMpr } = require('../mapper');
const ServiceExc = require('../exception');

const ensureNotExistedByName = async (name) => {
	if (await roleRepo.existByName(name)) throw new ServiceExc(failure.AlreadyExistedF);
};

const ensureExistedById = async (id) => {
	const old = await roleRepo.findById(id);
	if (_.isEmpty(old)) throw new ServiceExc(failure.NotExistedF);
	return old;
};

const ensureOwningExistedByIds = async (ids) => {
	const owning = await privilegeRepo.findAllById(ids);
	if (_.isEmpty(owning)) throw new ServiceExc(failure.OwningSideNotExistedF);
	return owning;
};

const save = async (creation) => {
	try {
		await roleVal.whenCreate(creation);
		await ensureNotExistedByName(creation.name);
		const owning = await ensureOwningExistedByIds(creation.privilegeIds);
		const saved = await roleRepo.save(creation);
		// @ts-ignore
		saved.setPrivileges(owning);
		return roleMpr.asResponse(saved);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.SaveF);
	}
};

const findById = async (id) => {
	try {
		const queried = await roleRepo.findById(id);
		if (_.isNull(queried)) throw new ServiceExc(failure.FindByIdNoContentF);
		return roleMpr.asResponse(queried);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.FindByIdF);
	}
};

const findAll = async ({ page, size }) => {
	try {
		await pageableVal.validate({ page, size });
		const { rows: queried, paging } = await roleRepo.findAll({ page, size });
		if (_.isEmpty(queried)) throw new ServiceExc(failure.FindAllNoContentF);
		const response = roleMpr.asListResponse(queried);
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
		const { rows: queried, paging } = await roleRepo.findAllBy({ page, size, cond });
		if (_.isEmpty(queried)) throw new ServiceExc(failure.FindAllByNoContentF);
		const response = roleMpr.asListResponse(queried);
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
		const { rows: queried, paging } = await roleRepo.findAllArchived({ page, size });
		if (_.isEmpty(queried)) throw new ServiceExc(failure.FindAllByNoContentF);
		const response = roleMpr.asListResponse(queried);
		return { response, paging };
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.FindAllArchivedF);
	}
};

const update = async (id, update) => {
	try {
		await roleVal.whenUpdate(update);
		const old = await ensureExistedById(id);
		await roleRepo.update(id, update);
		return roleMpr.asResponse(old);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.UpdateF);
	}
};

const remove = async (id) => {
	try {
		const old = await ensureExistedById(id);
		// @ts-ignore
		old.setPrivileges([]);
		await roleRepo.remove(id);
		return roleMpr.asResponse(old);
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
