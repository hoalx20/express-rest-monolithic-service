const { StatusCodes } = require('http-status-codes');

module.exports = Object.freeze({
	UncategorizedF: { code: 0, msg: 'uncategorized exception, service can not response.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	NotFoundF: { code: 1, msg: 'apis resource not found.', httpCode: StatusCodes.NOT_FOUND },
	MethodNotAllowed: { code: 2, msg: 'method not allowed on this endpoint.', httpCode: StatusCodes.METHOD_NOT_ALLOWED },
	BodyNotReadableF: { code: 3, msg: 'missing or request body is not readable.', httpCode: StatusCodes.BAD_REQUEST },
	HeaderNotReadableF: { code: 4, msg: 'missing or request header is not readable.', httpCode: StatusCodes.BAD_REQUEST },
	QueryNotReadableF: { code: 5, msg: 'missing or query string is not readable.', httpCode: StatusCodes.BAD_REQUEST },
	PathNotReadableF: { code: 6, msg: 'missing or path variable is not readable.', httpCode: StatusCodes.BAD_REQUEST },
	UnauthorizedF: { code: 7, msg: 'ill legal token: token has been edited, expired or not publish by us.', httpCode: StatusCodes.UNAUTHORIZED },
	ForbiddenF: { code: 8, msg: 'forbidden: do not has right authority, do not f*ck with cat.', httpCode: StatusCodes.FORBIDDEN },
});
