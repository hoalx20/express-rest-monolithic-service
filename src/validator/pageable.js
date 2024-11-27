const Joi = require('joi');

const {
	global: { QueryNotReadableF },
} = require('../constant');
const ServiceExc = require('../exception');

const pageable = Joi.object({
	page: Joi.number().min(1).required(),
	size: Joi.number().min(5).max(50).required(),
});

const validate = async (creation) => {
	try {
		await pageable.validateAsync(creation);
	} catch (error) {
		console.log(`Error on Validator: ${error.message}`);
		throw new ServiceExc(QueryNotReadableF, error.message.replaceAll('"', ''));
	}
};

module.exports = { validate };
