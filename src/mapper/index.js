const privilegeMpr = require('./privilege');
const roleMpr = require('./role');
const userMpr = require('./user');
const statusMpr = require('./status');
const deviceMpr = require('./device');
const badCredentialMpr = require('./bad-credential');
const authMpr = require('./auth');

module.exports = { privilegeMpr, roleMpr, userMpr, statusMpr, deviceMpr, badCredentialMpr, authMpr };
