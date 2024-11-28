const express = require('express');
const route = express.Router();

const { userCtl } = require('../controller');
const {
	validate: { idRule, validated },
} = require('../middleware');

route.post('/', userCtl.save);
route.get('/', userCtl.findAll);
route.get('/search', userCtl.findAllBy);
route.get('/archived', userCtl.findAllArchived);
route.get('/:id', idRule(), validated, userCtl.findById);
route.patch('/:id', idRule(), validated, userCtl.update);
route.delete('/:id', idRule(), validated, userCtl.remove);

module.exports = route;
