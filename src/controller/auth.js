const { success, failure } = require('../constant');
const { authSrv, badCredentialSrv } = require('../service');
const response = require('../response');
const ServiceExc = require('../exception');
const { request } = require('express');

const signUp = async (req, res, next) => {
	try {
		const { username, password, roleIds } = req.body;
		const request = { username, password, roleIds };
		const credential = await authSrv.signUp(request);
		response.doSuccess(res, success.SignUpS, credential);
	} catch (error) {
		next(error);
	}
};

const signIn = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const request = { username, password };
		const credential = await authSrv.signIn(request);
		response.doSuccess(res, success.SignInS, credential);
	} catch (error) {
		next(error);
	}
};

const me = async (req, res, next) => {
	try {
		const { username } = req.user;
		const user = await authSrv.me(username);
		response.doSuccess(res, success.RetrieveProfileS, user);
	} catch (error) {
		next(error);
	}
};

const signOut = async (req, res, next) => {
	try {
		const { sessionId: accessTokenId, sessionExpiredAt: accessTokenExpiredAt, userId } = req.user;
		const badCredential = { accessTokenId, accessTokenExpiredAt, userId };
		const sessionId = await authSrv.signOut(badCredential);
		response.doSuccess(res, success.SignOutS, sessionId);
	} catch (error) {
		next(error);
	}
};

const refresh = async (req, res, next) => {
	try {
		const xRefreshToken = req.header('X-REFRESH-TOKEN');
		if (!xRefreshToken) throw new ServiceExc(failure.MissingAuthorizationF);
		const refreshToken = xRefreshToken.replace('Bearer ', '');
		const { sessionId: accessTokenId, sessionExpiredAt: accessTokenExpiredAt, userId, referId } = req.user;
		const badCredential = { accessTokenId, accessTokenExpiredAt, userId };
		const credential = await authSrv.refresh(badCredential, referId, refreshToken);
		response.doSuccess(res, success.RefreshTokenS, credential);
	} catch (error) {
		next(error);
	}
};

module.exports = { signUp, signIn, me, signOut, refresh };
