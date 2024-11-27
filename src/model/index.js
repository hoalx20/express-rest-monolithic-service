const userMdl = require('./user');
const roleMdl = require('./role');
const privilegeMdl = require('./privilege');
const deviceMdl = require('./device');
const statusMdl = require('./status');
const badCredentialMdl = require('./bad-credential');
const { doAssociation, doHooks } = require('./setup');

doAssociation(privilegeMdl, roleMdl, userMdl, deviceMdl, statusMdl);
doHooks(userMdl);

module.exports = { userMdl, roleMdl, privilegeMdl, deviceMdl, statusMdl, badCredentialMdl };
