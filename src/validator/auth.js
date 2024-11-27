const Joi = require('joi');

const {
	global: { BodyNotReadableF },
} = require('../constant');
const ServiceExc = require('../exception');

const signUp = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	roleIds: Joi.array().items(Joi.number()).required(),
});

const signIn = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
});

const whenSignUp = async (model) => {
	try {
		await signUp.validateAsync(model);
	} catch (error) {
		console.log(`Error on Validator: ${error.message}`);
		throw new ServiceExc(BodyNotReadableF, error.message.replaceAll('"', ''));
	}
};

const whenSignIn = async (model) => {
	try {
		await signIn.validateAsync(model);
	} catch (error) {
		console.log(`Error on Validator: ${error.message}`);
		throw new ServiceExc(BodyNotReadableF, error.message.replaceAll('"', ''));
	}
};

module.exports = { whenSignIn, whenSignUp };
