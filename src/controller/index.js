const privilegeCtl = require('./privilege');
const roleCtl = require('./role');
const userCtl = require('./user');
const deviceCtl = require('./device');
const statusCtl = require('./status');
const authCtl = require('./auth');

module.exports = {
	privilegeCtl,
	roleCtl,
	userCtl,
	deviceCtl,
	statusCtl,
	authCtl,
};
