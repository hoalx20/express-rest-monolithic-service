const express = require('express');
const route = express.Router();

const { privilegeCtl } = require('../controller');
const {
	validate: { idRule, validated },
} = require('../middleware');

route.post('/', privilegeCtl.save);
route.get('/', privilegeCtl.findAll);
route.get('/search', privilegeCtl.findAllBy);
route.get('/archived', privilegeCtl.findAllArchived);
route.get('/:id', idRule(), validated, privilegeCtl.findById);
route.patch('/:id', idRule(), validated, privilegeCtl.update);
route.delete('/:id', idRule(), validated, privilegeCtl.remove);

module.exports = route;
