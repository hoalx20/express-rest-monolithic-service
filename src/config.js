const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
// @ts-ignore
const swaggerDoc = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');

const {
	sequelizeCtx: { sequelize },
	expressCtx: { app },
} = require('./context');
const {
	global: { NotFoundF, UncategorizedF, BodyNotReadableF },
} = require('./constant');
const model = require('./model');
const response = require('./response');
const ServiceExc = require('./exception');
const passportProvider = require('./passport');
const { routeSetup } = require('./router');

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

const middlewareConfig = () => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());
	app.use(compression());
	// @ts-ignore
	app.use(helmet());
	app.use(morgan('dev'));
};

const routeConfig = () => routeSetup.established(app);

const passportConfig = () => passportProvider.jwtStrategy();

const parseBodyConfig = () => {
	app.use((err, req, res, next) => {
		if (err.status == 400) {
			response.doErrorWith(res, BodyNotReadableF);
			return;
		}
		next(err);
	});
};

const recoveryConfig = () => {
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

const swaggerConfig = () => app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc, {}));

module.exports = { dbConfig, middlewareConfig, parseBodyConfig, recoveryConfig, routeConfig, passportConfig, swaggerConfig };
