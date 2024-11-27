const Joi = require('joi');

const {
	global: { BodyNotReadableF },
} = require('../constant');
const ServiceExc = require('../exception');

const creation = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	roleIds: Joi.array().items(Joi.number()).required(),
});

const update = Joi.object({
	password: Joi.string(),
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
