const _ = require('lodash');

const { failure } = require('../constant');
const { deviceVal, pageableVal } = require('../validator');
const { deviceRepo, userRepo } = require('../repository');
const { deviceMpr } = require('../mapper');
const ServiceExc = require('../exception');

const ensureNotExistedByIpAddress = async (ipAddress) => {
	if (await deviceRepo.existByIpAddress(ipAddress)) throw new ServiceExc(failure.AlreadyExistedF);
};

const ensureExistedById = async (id) => {
	const old = await deviceRepo.findById(id);
	if (_.isEmpty(old)) throw new ServiceExc(failure.NotExistedF);
	return old;
};

const ensureOwningExistedById = async (id) => {
	const owning = await userRepo.findById(id);
	if (_.isNull(owning)) throw new ServiceExc(failure.OwningSideNotExistedF);
	return owning;
};

const save = async (creation) => {
	try {
		await deviceVal.whenCreate(creation);
		await ensureNotExistedByIpAddress(creation.ipAddress);
		const owning = await ensureOwningExistedById(creation.userId);
		const saved = await deviceRepo.save(creation);
		// @ts-ignore
		saved.setUser(owning);
		return deviceMpr.asResponse(saved);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.SaveF);
	}
};

const findById = async (id) => {
	try {
		const queried = await deviceRepo.findById(id);
		if (_.isNull(queried)) throw new ServiceExc(failure.FindByIdNoContentF);
		return deviceMpr.asResponse(queried);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.FindByIdF);
	}
};

const findAll = async ({ page, size }) => {
	try {
		await pageableVal.validate({ page, size });
		const { rows: queried, paging } = await deviceRepo.findAll({ page, size });
		if (_.isEmpty(queried)) throw new ServiceExc(failure.FindAllNoContentF);
		const response = deviceMpr.asListResponse(queried);
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
		const { rows: queried, paging } = await deviceRepo.findAllBy({ page, size, cond });
		if (_.isEmpty(queried)) throw new ServiceExc(failure.FindAllByNoContentF);
		const response = deviceMpr.asListResponse(queried);
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
		const { rows: queried, paging } = await deviceRepo.findAllArchived({ page, size });
		if (_.isEmpty(queried)) throw new ServiceExc(failure.FindAllArchivedNoContentF);
		const response = deviceMpr.asListResponse(queried);
		return { response, paging };
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.FindAllArchivedF);
	}
};

const update = async (id, update) => {
	try {
		await deviceVal.whenUpdate(update);
		const old = await ensureExistedById(id);
		await deviceRepo.update(id, update);
		return deviceMpr.asResponse(old);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.UpdateF);
	}
};

const remove = async (id) => {
	try {
		const old = await ensureExistedById(id);
		await deviceRepo.remove(id);
		return deviceMpr.asResponse(old);
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
