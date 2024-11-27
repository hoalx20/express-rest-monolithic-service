const { badCredentialMdl } = require('../model');

const save = async (model) => await badCredentialMdl.create(model);

const existsByAccessTokenId = async (accessTokenId) => (await badCredentialMdl.count({ where: { accessTokenId } })) > 0;

module.exports = { save, existsByAccessTokenId };
