const privilegeRtr = require('./privilege');
const roleRtr = require('./role');
const userRtr = require('./user');
const deviceRtr = require('./device');
const statusRtr = require('./status');
const authRtr = require('./auth');

const established = (app) => {
	app.use('/api/v1/auth', authRtr);
	// prettier-ignore
	app.use('/api/v1/privileges', privilegeRtr,
		// #swagger.ignore = true
	);
	// prettier-ignore
	app.use('/api/v1/roles', roleRtr,
		// #swagger.ignore = true
	);
	// prettier-ignore
	app.use('/api/v1/users', userRtr,
		// #swagger.ignore = true
	);
	// prettier-ignore
	app.use('/api/v1/devices', deviceRtr,
		// #swagger.ignore = true
	);
	// prettier-ignore
	app.use('/api/v1/statuses', statusRtr,
		// #swagger.ignore = true
	);
};
module.exports = { established };
