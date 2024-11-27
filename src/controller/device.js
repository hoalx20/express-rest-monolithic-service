const _ = require('lodash');

const { deviceSrv } = require('../service');
const { success } = require('../constant');
const response = require('../response');

const save = async (req, res, next) => {
	try {
		const { ipAddress, userAgent, userId } = req.body;
		const creation = { ipAddress, userAgent, userId };
		const saved = await deviceSrv.save(creation);
		response.doSuccess(res, success.SaveS, saved);
	} catch (error) {
		next(error);
	}
};

const findById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const queried = await deviceSrv.findById(parseInt(id));
		response.doSuccess(res, success.FindByIdS, queried);
	} catch (error) {
		next(error);
	}
};

const findAll = async (req, res, next) => {
	try {
		const { page, size } = req.query;
		const { response: queried, paging } = await deviceSrv.findAll({ page: parseInt(page), size: parseInt(size) });
		response.doSuccessPaging(res, success.FindAllS, queried, paging);
	} catch (error) {
		next(error);
	}
};

const findAllBy = async (req, res, next) => {
	try {
		const { page, size, userAgent } = req.query;
		const cond = _.pickBy({ userAgent }, (v) => !_.isNil(v));
		const { response: queried, paging } = await deviceSrv.findAllBy({ page: parseInt(page), size: parseInt(size), cond });
		response.doSuccessPaging(res, success.FindAllByS, queried, paging);
	} catch (error) {
		next(error);
	}
};

const findAllArchived = async (req, res, next) => {
	try {
		const { page, size } = req.query;
		const { response: queried, paging } = await deviceSrv.findAllArchived({ page: parseInt(page), size: parseInt(size) });
		response.doSuccessPaging(res, success.FindAllByS, queried, paging);
	} catch (error) {
		next(error);
	}
};

const update = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { userAgent } = req.body;
		const update = { userAgent };
		const old = await deviceSrv.update(parseInt(id), update);
		response.doSuccess(res, success.UpdateS, old);
	} catch (error) {
		next(error);
	}
};

const remove = async (req, res, next) => {
	try {
		const { id } = req.params;
		const old = await deviceSrv.remove(parseInt(id));
		response.doSuccess(res, success.DeleteS, old);
	} catch (error) {
		next(error);
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
