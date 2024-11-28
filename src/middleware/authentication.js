const passport = require('passport');

const { failure, global } = require('../constant');
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

const authenticated = async (req, res, next) => {
	await passport.authenticate('jwt', { session: false }, async (err, payload, info) => {
		try {
			if (info) {
				if (info.name === 'TokenExpiredError') return next(new ServiceExc(failure.TokenExpiredF));
				return next(new ServiceExc(global.UnauthorizedF));
			}
			const accessToken = req.header('Authorization').replace('Bearer ', '');
			await badCredentialSrv.ensureNotBadCredential(accessToken);
			const { sub, jti, exp, ...user } = payload;
			req.user = { ...user, username: sub, sessionId: jti, sessionExpiredAt: exp };
			next();
		} catch (error) {
			console.log(`Error on Middleware: ${error.message}`);
			if (error instanceof ServiceExc) return next(error);
			next(new ServiceExc(global.UnauthorizedF));
		}
	})(req, res, next);
};

module.exports = { authenticate, authenticated };
