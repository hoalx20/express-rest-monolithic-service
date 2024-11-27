const _ = require('lodash');

const { failure } = require('../constant');
const { badCredentialRepo } = require('../repository');
const { badCredentialMpr } = require('../mapper');
const { jwtProvider } = require('../auth');
const ServiceExc = require('../exception');

const ensureNotBadCredential = async (token) => {
	try {
		const claims = jwtProvider.verify(token, process.env.ACCESS_TOKEN_SECRET);
		// @ts-ignore
		const isBadCredential = await badCredentialRepo.existsByAccessTokenId(claims.jti);
		if (isBadCredential) throw new ServiceExc(failure.TokenBlockedF);
		return claims;
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		throw new ServiceExc(failure.EnsureNotBadCredentialF, error.message);
	}
};

const save = async (creation) => {
	try {
		const saved = await badCredentialRepo.save(creation);
		return badCredentialMpr.asResponse(saved);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.SaveF);
	}
};

module.exports = { ensureNotBadCredential, save };
