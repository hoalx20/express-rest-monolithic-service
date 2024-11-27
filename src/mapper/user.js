const asResponse = (model) => {
	const { deletedAt, createdAt, updatedAt, password, ...raw } = model.toJSON();
	return raw;
};

const asListResponse = (models) => models.map((v) => asResponse(v));

module.exports = { asResponse, asListResponse };
