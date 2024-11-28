require('dotenv').config();
const swaggerAutoGen = require('swagger-autogen')();

const outputFilePath = './swagger.json';
const info = {
	info: {
		title: 'Express Restful Service',
		description: 'Express Restful Service Monolithic Architecture',
	},
	host: `localhost:${process.env.PORT || 8000}`,
	basePath: '/',
	schemes: ['http', 'https'],
	consumes: ['application/json'],
	produces: ['application/json'],
	securityDefinitions: {
		authorization: { type: 'apiKey', in: 'header', name: 'Authorization', description: 'access token' },
		xRefreshToken: { type: 'apiKey', in: 'header', name: 'X-REFRESH-TOKEN', description: 'refresh token' },
	},
	'@definitions': {
		RegisterRequest: {
			type: 'object',
			required: ['username', 'password', 'roleIds'],
			properties: {
				username: { type: 'string', description: 'username must be a string, and unique', example: 'hoalx0' },
				password: { type: 'string', description: 'username must be a string', example: 'hoalx0' },
				roleIds: { type: 'array', items: { type: 'integer' }, description: 'role id, must be an array of integer', example: [1] },
			},
		},
		Credential: {
			type: 'object',
			required: ['accessToken', 'refreshToken', 'accessTokenIssuedAt', 'refreshTokenIssuedAt'],
			properties: {
				accessToken: { type: 'string', description: 'access token', example: 'accessToken' },
				accessTokenIssuedAt: { type: 'integer', description: 'access token issued at', example: 'accessTokenIssuedAt' },
				refreshToken: { type: 'string', description: 'refresh token', example: 0 },
				refreshTokenIssuedAt: { type: 'integer', description: 'refresh token issued at', example: 0 },
			},
		},
		CredentialRequest: {
			type: 'object',
			required: ['username', 'password'],
			properties: {
				username: { type: 'string', description: 'username must be a string, and unique', example: 'hoalx0' },
				password: { type: 'string', description: 'username must be a string', example: 'hoalx0' },
			},
		},
		RegisterResponse: {
			type: 'object',
			required: ['username', 'password', 'roleIds'],
			properties: {
				id: { type: 'integer', description: 'user id', example: 1 },
				username: { type: 'string', description: 'username', example: 'hoalx0' },
				roleId: {
					type: 'array',
					items: { type: 'object' },
					description: 'role information: include name, description and privileges',
					example: [{ name: 'ADMIN', description: 'admin role', privileges: [{ name: 'CREATE', description: 'create privilege' }] }],
				},
			},
		},
	},
};
// @ts-ignore
const routersFilePath = ['./router/setup.js'];

swaggerAutoGen(outputFilePath, routersFilePath, info);
