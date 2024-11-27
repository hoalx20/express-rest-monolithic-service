const express = require('express');
const route = express.Router();

const { authCtl } = require('../controller');
const {
	authentication: { authenticate },
} = require('../middleware');
const uriPath = 'auth';

route.post('/sign-up', authCtl.signUp);
route.post('/sign-in', authCtl.signIn);
route.get('/me', authenticate, authCtl.me);
route.post('/sign-out', authenticate, authCtl.signOut);
route.post('/refresh', authenticate, authCtl.refresh);

module.exports = { route, uriPath };
