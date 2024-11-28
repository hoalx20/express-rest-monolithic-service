const express = require('express');
const route = express.Router();

const { authCtl } = require('../controller');
const {
	authentication: { authenticate, authenticated },
} = require('../middleware');
const uriPath = 'auth';

route.post('/sign-up', authCtl.signUp);
route.post('/sign-in', authCtl.signIn);
route.get('/me', authenticated, authCtl.me);
route.post('/sign-out', authenticated, authCtl.signOut);
route.post('/refresh', authenticated, authCtl.refresh);

module.exports = { route, uriPath };
