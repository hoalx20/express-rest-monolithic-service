require('dotenv').config();

const {
	expressCtx: { app },
} = require('./src/context');
const appCfg = require('./src/config');

const main = async () => {
	const PORT = process.env.PORT || 8000;
	await appCfg.dbConfig();
	appCfg.passportConfig();
	appCfg.middlewareConfig();
	appCfg.swaggerConfig();
	appCfg.routeConfig();
	appCfg.parseBodyConfig();
	appCfg.recoveryConfig();
	app.listen(PORT);
};

main();
