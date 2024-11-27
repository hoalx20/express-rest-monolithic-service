const { param, validationResult } = require('express-validator');

const {
	global: { PathNotReadableF },
} = require('../constant');
const ServiceExc = require('../exception');

const idRule = () => param('id').notEmpty().withMessage('id is required').isInt().withMessage('id must be a integer number');

const validated = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) return next();
	// prettier-ignore
	// @ts-ignore
	const message = errors.array().at(0).msg;
	throw new ServiceExc(PathNotReadableF, message);
};

module.exports = { validated, idRule };
