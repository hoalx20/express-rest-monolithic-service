const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { userSrv } = require('./service');

const jwtStrategy = () => {
	passport.use(
		new JwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromHeader('authorization'),
				secretOrKey: process.env.ACCESS_TOKEN_SECRET,
				passReqToCallback: true,
			},
			async (req, payload, done) => {
				try {
					const { sub: username } = payload;
					await userSrv.findByUsername(username);
					done(null, payload);
				} catch (error) {
					console.log(`Error on Passport: ${error.message}`);
					return done(error, null);
				}
			},
		),
	);
};

module.exports = { jwtStrategy };
