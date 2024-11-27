const asResponse = (model) => {
	const { deletedAt, createdAt, updatedAt, ...raw } = model.toJSON();
	return raw;
};

module.exports = { asResponse };
