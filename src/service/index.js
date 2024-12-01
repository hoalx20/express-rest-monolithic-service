const privilegeSrv = require('./privilege');
const roleSrv = require('./role');
const userSrv = require('./user');
const deviceSrv = require('./device');
const statusSrv = require('./status');
const badCredentialSrv = require('./bad-credential');
const authSrv = require('./auth');

module.exports = { privilegeSrv, roleSrv, userSrv, deviceSrv, statusSrv, badCredentialSrv, authSrv };
