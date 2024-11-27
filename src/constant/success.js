const { StatusCodes } = require('http-status-codes');

module.exports = Object.freeze({
	SaveS: { code: 1, msg: '{resource} has been saved.', httpCode: StatusCodes.CREATED },
	FindByIdS: { code: 1, msg: 'query {resource} by id success.', httpCode: StatusCodes.OK },
	FindAllS: { code: 1, msg: 'query {resource}s success.', httpCode: StatusCodes.OK },
	FindAllByS: { code: 1, msg: 'query {resource} by {criteria} success.', httpCode: StatusCodes.OK },
	FindAllArchivedS: { code: 1, msg: 'query {resource} by {criteria} success.', httpCode: StatusCodes.OK },
	UpdateS: { code: 1, msg: '{resource} has been updated.', httpCode: StatusCodes.OK },
	DeleteS: { code: 1, msg: '{resource} has been deleted.', httpCode: StatusCodes.OK },
	SignUpS: { code: 1, msg: 'sign up success, enjoy.', httpCode: StatusCodes.CREATED },
	SignInS: { code: 1, msg: 'sign in success, enjoy.', httpCode: StatusCodes.OK },
	RetrieveProfileS: { code: 1, msg: 'retrieve profile success, enjoy.', httpCode: StatusCodes.OK },
	SignOutS: { code: 1, msg: 'sign out success, enjoy.', httpCode: StatusCodes.OK },
	RefreshTokenS: { code: 1, msg: 'refresh token success, enjoy.', httpCode: StatusCodes.OK },
});
