const { Strategy, ExtractJwt } = require('passport-jwt');

const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]) || ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

const JwtStrategy = new Strategy(options, (payload, done) => {
    return done(null, payload);
})

function cookieExtractor(req) {                                                                 // Custom extractor
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies['token'];
    }
    return token;
};

module.exports = JwtStrategy;