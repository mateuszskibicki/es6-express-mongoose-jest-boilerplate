import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import config from './config';

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecret;

export default passport => {
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      if (jwt_payload.id) return done(null, jwt_payload);
      return done(null, false);
    })
  );
};

//
//
//    JWT STRATEGY -- > https://jwt.io/
//
//
