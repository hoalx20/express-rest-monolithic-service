const asResponse = (model) => {
	const { userId, deletedAt, createdAt, updatedAt, ...raw } = model.toJSON();
	return raw;
};

const asListResponse = (models) => models.map((v) => asResponse(v));

module.exports = { asResponse, asListResponse };
