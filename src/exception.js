class ServiceExc extends Error {
	constructor(causeBy, msg = undefined) {
		msg ? super(msg) : super(causeBy.msg);
		this.causeBy = causeBy;
	}
}

module.exports = ServiceExc;
