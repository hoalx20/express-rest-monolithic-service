const { success, failure } = require('../constant');
const { authSrv } = require('../service');
const response = require('../response');
const ServiceExc = require('../exception');

const signUp = async (req, res, next) => {
	/**
	 * #swagger.auto = false
	 * #swagger.tags = ['auth']
	 * #swagger.summary = 'Sign up for new user'
	 * #swagger.description = 'Sign up for new user with username, password and roleIds'
	 * #swagger.parameters['body'] = { in: 'body', description: 'Register information.', schema: { $ref: '#/definitions/RegisterRequest' }}
	 *
	 * #swagger.responses[200] = { description: 'Register success.', schema: { $ref: '#/definitions/Credential' }}
	 * #swagger.responses[400] = { description: 'Bad request: missing username, password, roleIds, username already exists, etc...'}
	 * #swagger.responses[500] = { description: 'Uncategorized error.'}
	 */
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
	/**
	 * #swagger.auto = false
	 * #swagger.tags = ['auth']
	 * #swagger.summary = 'Sign in existing user'
	 * #swagger.description = 'Sign in existing user with username and password'
	 * #swagger.parameters['body'] = { in: 'body', description: 'Credential information: username and password', schema: { $ref: '#/definitions/CredentialRequest' }}
	 *
	 * #swagger.responses[200] = { description: 'Sign in success.', schema: { $ref: '#/definitions/Credential' }}
	 * #swagger.responses[400] = { description: 'Bad request: missing username, password, username not already exists, etc...'}
	 * #swagger.responses[500] = { description: 'Uncategorized error.'}
	 */
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
	/**
	 * #swagger.auto = false
	 * #swagger.tags = ['auth']
	 * #swagger.summary = 'Retrieve profile information'
	 * #swagger.description = 'Retrieve profile information using access token'
	 * #swagger.security = [{ "authorization": [] }]
	 *
	 * #swagger.responses[200] = { description: 'Retrieve profile success.', schema: { $ref: '#/definitions/RegisterResponse' }}
	 * #swagger.responses[401] = { description: 'Unauthorized: missing token, token expired, token edited, token has been recall etc...'}
	 * #swagger.responses[500] = { description: 'Uncategorized error.'}
	 */
	try {
		const { username } = req.user;
		const user = await authSrv.me(username);
		response.doSuccess(res, success.RetrieveProfileS, user);
	} catch (error) {
		next(error);
	}
};

const signOut = async (req, res, next) => {
	/**
	 * #swagger.auto = false
	 * #swagger.tags = ['auth']
	 * #swagger.summary = 'Sign out from logon session'
	 * #swagger.description = 'Sign out from logon session'
	 * #swagger.security = [{ "authorization": [] }]
	 *
	 * #swagger.responses[200] = { description: 'Sign out success.' }}
	 * #swagger.responses[401] = { description: 'Unauthorized: missing token, token expired, token edited, etc...'}
	 * #swagger.responses[500] = { description: 'Uncategorized error.'}
	 */
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
		/**
		 * #swagger.auto = false
		 * #swagger.tags = ['auth']
		 * #swagger.summary = 'Sign out from logon session'
		 * #swagger.description = 'Sign out from logon session'
		 * #swagger.security = [{ "authorization": [], "xRefreshToken": [] }]
		 *
		 * #swagger.responses[200] = { description: 'Sign out success.' }}
		 * #swagger.responses[401] = { description: 'Unauthorized: missing token, token expired, token edited, token not suite, etc...'}
		 * #swagger.responses[500] = { description: 'Uncategorized error.'}
		 */
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
