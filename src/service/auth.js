const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const { failure } = require('../constant');
const { authMpr } = require('../mapper');
const { jwtProvider } = require('../auth');
const ServiceExc = require('../exception');
const userSrv = require('../service/user');
const badCredentialSrv = require('./bad-credential');
const { authVal } = require('../validator');

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_TIME_TO_LIVE, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_TIME_TO_LIVE } = process.env;

const newCredential = (user) => {
	const accessTokenId = uuidv4();
	const refreshTokenId = uuidv4();
	const accessToken = jwtProvider.sign(user, parseInt(ACCESS_TOKEN_TIME_TO_LIVE), ACCESS_TOKEN_SECRET, accessTokenId, refreshTokenId);
	const refreshToken = jwtProvider.sign(user, parseInt(REFRESH_TOKEN_TIME_TO_LIVE), REFRESH_TOKEN_SECRET, refreshTokenId, accessTokenId);
	return { accessToken, accessTokenIssuedAt: Date.now(), refreshToken, refreshTokenIssuedAt: Date.now() };
};

// FIXME: JWT Token not include scope in payload in signUp but has in SignIn
const signUp = async (request) => {
	try {
		await authVal.whenSignUp(request);
		const creation = authMpr.asUserCreation(request);
		const user = await userSrv.save(creation);
		return newCredential(user);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) {
			if (error.causeBy === failure.AlreadyExistedF) throw new ServiceExc(failure.UserExistedF);
			throw error;
		}
		throw new ServiceExc(failure.SignUpF);
	}
};

const signIn = async (request) => {
	try {
		await authVal.whenSignIn(request);
		const user = await userSrv.findByUsername(request.username);
		const isAuthenticated = await bcrypt.compare(request.password, user.password);
		if (!isAuthenticated) throw new ServiceExc(failure.BadCredentialF);
		return newCredential(user);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.SignInF);
	}
};

const me = async (username) => {
	try {
		const queried = await userSrv.findByUsername(username);
		return authMpr.fromUserResponse(queried);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) {
			if (error.causeBy === failure.AlreadyExistedF) throw new ServiceExc(failure.UserExistedF);
			throw error;
		}
		throw new ServiceExc(failure.RetrieveProfileF);
	}
};

const signOut = async (badCredential) => {
	try {
		const saved = await badCredentialSrv.save(badCredential);
		return saved.id;
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.SignOutF);
	}
};

const refresh = async (badCredential, referId, refreshToken) => {
	try {
		const claims = await jwtProvider.verify(refreshToken, REFRESH_TOKEN_SECRET);
		// @ts-ignore
		const refreshTokenId = claims.jti;
		if (referId !== refreshTokenId) throw new ServiceExc(failure.TokenNotSuitableF);
		await badCredentialSrv.save(badCredential);
		const user = await userSrv.findById(badCredential.userId);
		return newCredential(user);
	} catch (error) {
		console.log(`Error on Service: ${error.message}`);
		if (error instanceof ServiceExc) throw error;
		throw new ServiceExc(failure.RefreshTokenF);
	}
};

module.exports = { signUp, signIn, me, signOut, refresh };
