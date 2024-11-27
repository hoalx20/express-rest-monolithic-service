const _ = require('lodash');

const { failure } = require('../constant');
const { userVal, pageableVal } = require('../validator');
const { userRepo, roleRepo } = require('../repository');
const { userMpr } = require('../mapper');
const ServiceExc = require('../exception');

const ensureNotExistedByUsername = async (username) => {
	if (await userRepo.existByUsername(username)) throw new ServiceExc(failure.AlreadyExistedF);
};

const ensureExistedById = async (id) => {
	const old = await userRepo.findById(id);
	if (_.isEmpty(old)) throw new ServiceExc(failure.NotExistedF);
	return old;
};

const ensureOwningExistedByIds = async (ids) => {
	const owning = await roleRepo.findAllById(ids);
	if (_.isEmpty(owning)) throw new ServiceExc(failure.OwningSideNotExistedF);
	return owning;
};

const save = async (creation) => {
	try {
		await userVal.whenCreate(creation);
		await ensureNotExistedByUsername(creation.username);
		const owning = await ensureOwningExistedByIds(creation.roleIds);
		const saved = await userRepo.save(creation);
		// @ts-ignore
		saved.setRoles(owning);
		return userMpr.asResponse(saved);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.SaveF);
	}
};

const findById = async (id) => {
	try {
		const queried = await userRepo.findById(id);
		if (_.isNull(queried)) {
			throw new ServiceExc(failure.FindByIdNoContentF);
		}
		const response = userMpr.asResponse(queried);
		return response;
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.FindByIdF);
	}
};

const findByUsername = async (username) => {
	try {
		const queried = await userRepo.findByUsername(username);
		if (_.isNull(queried)) throw new ServiceExc(failure.NotExistedF);
		return userMpr.asResponse(queried);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.FindByIdF);
	}
};

const findAll = async ({ page, size }) => {
	try {
		await pageableVal.validate({ page, size });
		const { rows: queried, paging } = await userRepo.findAll({ page, size });
		if (_.isEmpty(queried)) throw new ServiceExc(failure.FindAllNoContentF);
		const response = userMpr.asListResponse(queried);
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
		const { rows: queried, paging } = await userRepo.findAllBy({ page, size, cond });
		if (_.isEmpty(queried)) throw new ServiceExc(failure.FindAllByNoContentF);
		const response = userMpr.asListResponse(queried);
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
		const { rows: queried, paging } = await userRepo.findAllArchived({ page, size });
		if (_.isEmpty(queried)) throw new ServiceExc(failure.FindAllByNoContentF);
		const response = userMpr.asListResponse(queried);
		return { response, paging };
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.FindAllArchivedF);
	}
};

const update = async (id, update) => {
	try {
		await userVal.whenUpdate(update);
		const old = await ensureExistedById(id);
		await userRepo.update(id, update);
		return userMpr.asResponse(old);
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
		old.setRoles([]);
		await userRepo.remove(id);
		return userMpr.asResponse(old);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.DeleteF);
	}
};

module.exports = {
	save,
	findById,
	findByUsername,
	findAll,
	findAllBy,
	findAllArchived,
	update,
	remove,
};
