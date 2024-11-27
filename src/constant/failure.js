const { StatusCodes } = require('http-status-codes');

module.exports = Object.freeze({
	SaveF: { code: 200, msg: 'can not save {resource}: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	FindByIdF: { code: 201, msg: 'can not retrieve {resource} by id: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	FindByIdNoContentF: { code: 202, msg: 'retrieve {resource} by id return no content.', httpCode: StatusCodes.NO_CONTENT },
	FindByF: { code: 203, msg: 'can not query {resource} by {criteria}.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	FindByNoContentF: { code: 204, msg: 'retrieve {resource} by {criteria} return no content.', httpCode: StatusCodes.NO_CONTENT },
	FindAllByIdF: { code: 205, msg: 'can not retrieve {resource} by id: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	FindAllByIdNoContentF: { code: 206, msg: 'retrieve {resource} return no content.', httpCode: StatusCodes.NO_CONTENT },
	FindAllF: { code: 207, msg: 'can not retrieve {resource} by criteria: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	FindAllNoContentF: { code: 208, msg: 'retrieve {resource}s by {criteria} return no content.', httpCode: StatusCodes.NO_CONTENT },
	FindAllByF: { code: 209, msg: 'can not retrieve {resource} by criteria: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	FindAllByNoContentF: { code: 210, msg: 'retrieve {resource}s by {criteria} return no content.', httpCode: StatusCodes.NO_CONTENT },
	FindAllArchivedF: { code: 211, msg: 'can not retrieve archived {resource}: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	FindAllArchivedNoContentF: { code: 212, msg: 'retrieve archived {resource}s return no content.', httpCode: StatusCodes.NO_CONTENT },
	UpdateF: { code: 213, msg: 'can not update {resource}: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	DeleteF: { code: 214, msg: 'can not remove {resource}: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },

	AlreadyExistedF: { code: 214, msg: '{resource} already existed, {identity} must be unique.', httpCode: StatusCodes.BAD_REQUEST },
	NotExistedF: { code: 215, msg: '{resource} does not existed.', httpCode: StatusCodes.NOT_MODIFIED },
	OwningSideNotExistedF: { code: 216, msg: 'can not save {resource}: {owning side} not exists.', httpCode: StatusCodes.BAD_REQUEST },
	OwningSideNotAvailableF: { code: 217, msg: 'can not save {resource}: {owning side} not available.', httpCode: StatusCodes.BAD_REQUEST },

	SignJwtTokenF: { code: 218, msg: 'can not sign token: ill legal claims or encrypt algorithm.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	ParseJwtTokenF: { code: 219, msg: 'can not parse token: ill legal token or encrypt algorithm.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	IllLegalJwtTokenF: { code: 220, msg: 'ill legal token: token has been edited, expired or not publish by us.', httpCode: StatusCodes.UNAUTHORIZED },
	JwtTokenExpiredF: { code: 221, msg: 'ill legal token: token has been expired.', httpCode: StatusCodes.UNAUTHORIZED },

	SignUpF: { code: 222, msg: 'can not sign up: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	UserExistedF: { code: 223, msg: 'user already existed, username must be unique.', httpCode: StatusCodes.BAD_REQUEST },
	SignInF: { code: 224, msg: 'can not sign in: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	BadCredentialF: { code: 225, msg: 'bad credentials: username or password not match.', httpCode: StatusCodes.UNAUTHORIZED },
	RetrieveProfileF: { code: 226, msg: 'can not retrieve profile: try again later.', httpCode: StatusCodes.UNAUTHORIZED },
	// prettier-ignore
	MissingAuthorizationF: { code: 233, msg: 'unauthorized: missing authorization or x-refresh-token header in header list.', httpCode: StatusCodes.UNAUTHORIZED },
	SignOutF: { code: 227, msg: 'can not sign out: token not be recalled.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	EnsureNotBadCredentialF: { code: 228, msg: 'can not ensure token is not recalled.', httpCode: StatusCodes.UNAUTHORIZED },
	TokenBlockedF: { code: 229, msg: 'token has been recall: can not use this any more', httpCode: StatusCodes.UNAUTHORIZED },
	TokenNotSuitableF: { code: 230, msg: 'access token and refresh token are not suitable.', httpCode: StatusCodes.UNAUTHORIZED },
	RecallJwtTokenF: { code: 231, msg: 'refresh token may not complete: token not be recalled.', httpCode: StatusCodes.UNAUTHORIZED },
	RefreshTokenF: { code: 232, msg: 'can not refresh token: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
});
