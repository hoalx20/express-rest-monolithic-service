require('dotenv').config();
const express = require('express');

const appCfg = require('./src/config');
const { privilegeRtr, roleRtr, userRtr, deviceRtr, statusRtr } = require('./src/router');

const main = async () => {
	const PORT = process.env.PORT || 8000;
	const router = [privilegeRtr, roleRtr, userRtr, deviceRtr, statusRtr];
	const app = express();
	await appCfg.dbConfig();
	appCfg.middlewareConfig(app);
	appCfg.routeConfig(app, ...router);
	appCfg.parseBodyConfig(app);
	appCfg.recoveryConfig(app);
	app.listen(PORT);
};

main();
