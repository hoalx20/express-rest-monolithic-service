const { failure } = require('../constant');
const ServiceExc = require('../exception');
const { badCredentialSrv } = require('../service');

const authenticate = async (req, res, next) => {
	try {
		const authorization = req.header('Authorization');
		if (!authorization) throw new ServiceExc(failure.MissingAuthorizationF);
		const accessToken = authorization.replace('Bearer ', '');
		const claims = await badCredentialSrv.ensureNotBadCredential(accessToken);
		// @ts-ignore
		// prettier-ignore
		req.user = { username: claims.sub, userId: claims.userId, referId: claims.referId, sessionId: claims.jti, sessionExpiredAt: claims.exp, scope: claims.scope};
		next();
	} catch (error) {
		console.log(`Error on Middleware: ${error.message}`);
		next(error);
	}
};

module.exports = { authenticate };
