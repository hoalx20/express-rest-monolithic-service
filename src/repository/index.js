const privilegeRepo = require('./privilege');
const roleRepo = require('./role');
const userRepo = require('./user');
const deviceRepo = require('./device');
const statusRepo = require('./status');
const badCredentialRepo = require('./bad-credential');

module.exports = { privilegeRepo, roleRepo, userRepo, deviceRepo, statusRepo, badCredentialRepo };
