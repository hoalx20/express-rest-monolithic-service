const asResponse = (model) => {
	const { deletedAt, createdAt, updatedAt, ...raw } = model.toJSON();
	return raw;
};

const asListResponse = (models) => models.map((v) => asResponse(v));

module.exports = { asResponse, asListResponse };
