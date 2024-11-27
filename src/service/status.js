const _ = require('lodash');

const { failure } = require('../constant');
const { statusVal, pageableVal } = require('../validator');
const { statusRepo, userRepo } = require('../repository');
const { statusMpr } = require('../mapper');
const ServiceExc = require('../exception');

const ensureExistedById = async (id) => {
	const old = await statusRepo.findById(id);
	if (_.isEmpty(old)) throw new ServiceExc(failure.NotExistedF);
	return old;
};

const ensureOwningExistedById = async (id) => {
	const owning = await userRepo.findById(id);
	if (_.isNull(owning)) throw new ServiceExc(failure.OwningSideNotExistedF);
	return owning;
};

const ensureOwningAvailableById = async (owningId) => {
	const owning = await statusRepo.findByUserId(owningId);
	if (!_.isNull(owning)) throw new ServiceExc(failure.OwningSideNotAvailableF);
	return owning;
};

const save = async (creation) => {
	try {
		await statusVal.whenCreate(creation);
		const owning = await ensureOwningExistedById(creation.userId);
		await ensureOwningAvailableById(creation.userId);
		const saved = await statusRepo.save(creation);
		// @ts-ignore
		saved.setUser(owning);
		return statusMpr.asResponse(saved);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.SaveF);
	}
};

const findById = async (id) => {
	try {
		const queried = await statusRepo.findById(id);
		if (_.isNull(queried)) throw new ServiceExc(failure.FindByIdNoContentF);
		const response = statusMpr.asResponse(queried);
		return response;
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.FindByIdF);
	}
};

const findAll = async ({ page, size }) => {
	try {
		await pageableVal.validate({ page, size });
		const { rows: queried, paging } = await statusRepo.findAll({ page, size });
		if (_.isEmpty(queried)) throw new ServiceExc(failure.FindAllNoContentF);
		const response = statusMpr.asListResponse(queried);
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
		const { rows: queried, paging } = await statusRepo.findAllBy({ page, size, cond });
		if (_.isEmpty(queried)) throw new ServiceExc(failure.FindAllByNoContentF);
		const response = statusMpr.asListResponse(queried);
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
		const { rows: queried, paging } = await statusRepo.findAllArchived({ page, size });
		if (_.isEmpty(queried)) throw new ServiceExc(failure.FindAllByNoContentF);
		const response = statusMpr.asListResponse(queried);
		return { response, paging };
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.FindAllArchivedF);
	}
};

const update = async (id, update) => {
	try {
		await statusVal.whenUpdate(update);
		const old = await ensureExistedById(id);
		await statusRepo.update(id, update);
		return statusMpr.asResponse(old);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.UpdateF);
	}
};

const remove = async (id) => {
	try {
		const old = await ensureExistedById(id);
		await statusRepo.remove(id);
		return statusMpr.asResponse(old);
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
