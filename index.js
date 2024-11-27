require('dotenv').config();
const express = require('express');

const appCfg = require('./src/config');
const routers = require('./src/router');

const main = async () => {
	const PORT = process.env.PORT || 8000;
	const app = express();
	await appCfg.dbConfig();
	appCfg.middlewareConfig(app);
	appCfg.routeConfig(app, Object.values(routers));
	appCfg.parseBodyConfig(app);
	appCfg.recoveryConfig(app);
	app.listen(PORT);
};

main();
