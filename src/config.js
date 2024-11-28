const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

const {
	sequelizeClt: { sequelize },
} = require('./client');
const {
	global: { NotFoundF, UncategorizedF, BodyNotReadableF },
} = require('./constant');
const model = require('./model');
const response = require('./response');
const ServiceExc = require('./exception');
const passportProvider = require('./passport');

const DBConfigF = 'can not established connection to database via sequelize.';

const dbConfig = async () => {
	try {
		await sequelize.authenticate();
		/**
		 * await sequelize.sync({ alter: true });
		 */
	} catch (error) {
		console.log(`Error on Configuration: ${error.message}`);
		throw new Error(DBConfigF);
	}
};

const middlewareConfig = (app) => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());
	app.use(compression());
	// @ts-ignore
	app.use(helmet());
	app.use(morgan('dev'));
};

const passportConfig = (app) => {
	passportProvider.jwtStrategy();
};

const parseBodyConfig = (app) => {
	app.use((err, req, res, next) => {
		if (err.status == 400) {
			response.doErrorWith(res, BodyNotReadableF);
			return;
		}
		next(err);
	});
};

const recoveryConfig = (app) => {
	app.use((req, res, next) => {
		response.doErrorWith(res, NotFoundF);
	});
	app.use((err, req, res, next) => {
		if (err instanceof ServiceExc) {
			response.doError(res, err);
			return;
		}
		console.log(`Error on Recovery: ${err.message}`);
		response.doErrorWith(res, UncategorizedF);
	});
};

const routeConfig = (app, args) => {
	args.forEach((v) => {
		app.use(`/api/v1/${v.uriPath}`, v.route);
	});
};

module.exports = { dbConfig, middlewareConfig, parseBodyConfig, recoveryConfig, routeConfig, passportConfig };
