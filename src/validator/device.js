const Joi = require('joi');

const {
	global: { BodyNotReadableF },
} = require('../constant');
const ServiceExc = require('../exception');

const creation = Joi.object({
	userAgent: Joi.string().required(),
	ipAddress: Joi.string().required(),
	userId: Joi.number().required(),
});

const update = Joi.object({
	userAgent: Joi.string(),
	ipAddress: Joi.string(),
});

const whenCreate = async (model) => {
	try {
		await creation.validateAsync(model);
	} catch (error) {
		console.log(`Error on Validator: ${error.message}`);
		throw new ServiceExc(BodyNotReadableF, error.message.replaceAll('"', ''));
	}
};

const whenUpdate = async (model) => {
	try {
		await update.validateAsync(model);
	} catch (error) {
		console.log(`Error on Validator: ${error.message}`);
		throw new ServiceExc(BodyNotReadableF, error.message.replaceAll('"', ''));
	}
};

module.exports = { whenCreate, whenUpdate };
