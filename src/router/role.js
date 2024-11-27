const express = require('express');
const route = express.Router();

const { roleCtl } = require('../controller');
const {
	validate: { idRule, validated },
} = require('../middleware');
const uriPath = 'roles';

route.post('/', roleCtl.save);
route.get('/', roleCtl.findAll);
route.get('/search', roleCtl.findAllBy);
route.get('/archived', roleCtl.findAllArchived);
route.get('/:id', idRule(), validated, roleCtl.findById);
route.patch('/:id', idRule(), validated, roleCtl.update);
route.delete('/:id', idRule(), validated, roleCtl.remove);

module.exports = { route, uriPath };
