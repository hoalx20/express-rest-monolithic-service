const express = require('express');
const route = express.Router();

const { deviceCtl } = require('../controller');
const {
	validate: { idRule, validated },
} = require('../middleware');

route.post('/', deviceCtl.save);
route.get('/', deviceCtl.findAll);
route.get('/search', deviceCtl.findAllBy);
route.get('/archived', deviceCtl.findAllArchived);
route.get('/:id', idRule(), validated, deviceCtl.findById);
route.patch('/:id', idRule(), validated, deviceCtl.update);
route.delete('/:id', idRule(), validated, deviceCtl.remove);

module.exports = route;
