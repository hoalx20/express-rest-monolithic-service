const express = require('express');
const route = express.Router();

const { authCtl } = require('../controller');
const {
	authentication: { authenticated },
} = require('../middleware');

route.post('/sign-up', authCtl.signUp);
route.post('/sign-in', authCtl.signIn);
route.get('/me', authenticated, authCtl.me);
route.post('/sign-out', authenticated, authCtl.signOut);
route.post('/refresh', authenticated, authCtl.refresh);

module.exports = route;
