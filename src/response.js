const newResponse = (code, httpCode, msg, payload) => {
	return { timestamp: Date.now(), code, httpCode, msg, payload };
};

const newPagingResponse = (code, httpCode, msg, payload, paging) => {
	return { timestamp: Date.now(), code, httpCode, msg, payload, paging };
};

const doSuccess = (res, success, payload) => {
	const response = newResponse(success.code, success.httpCode, success.msg, payload);
	res.status(success.httpCode);
	res.send(response);
};

const doSuccessPaging = (res, success, payload, paging) => {
	const response = newPagingResponse(success.code, success.httpCode, success.msg, payload, paging);
	res.status(success.httpCode);
	res.send(response);
};

const doError = (res, exception) => {
	const causeBy = exception.causeBy;
	const response = newResponse(causeBy.code, causeBy.httpCode, exception.message);
	res.status(causeBy.httpCode);
	res.send(response);
};

const doErrorWith = (res, causeBy) => {
	const response = newResponse(causeBy.code, causeBy.httpCode, causeBy.msg);
	res.status(causeBy.httpCode);
	res.send(response);
};

module.exports = { doSuccess, doSuccessPaging, doError, doErrorWith };
