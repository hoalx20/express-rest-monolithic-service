const express = require('express');
const route = express.Router();

const { statusCtl } = require('../controller');
const {
	validate: { idRule, validated },
	authentication: { authenticate },
	authorization: { hasAuthority },
} = require('../middleware');
const {
	permission: { role },
} = require('../constant');
const uriPath = 'statuses';

route.post('/', authenticate, statusCtl.save);
route.get('/', statusCtl.findAll);
route.get('/search', statusCtl.findAllBy);
route.get('/archived', statusCtl.findAllArchived);
route.get('/:id', idRule(), validated, authenticate, hasAuthority(role.ROLE_USER), statusCtl.findById);
route.patch('/:id', idRule(), validated, statusCtl.update);
route.delete('/:id', idRule(), validated, statusCtl.remove);

module.exports = { route, uriPath };
