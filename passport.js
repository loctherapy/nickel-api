const JwtStrategy = require("passport-jwt").Strategy;
const config = require("./config")();
const User = require("./user/user.model");

module.exports = function(passport) {
    let opts = {
        secretOrKey: config.secret
    };

    passport.use(
        new JwtStrategy(opts, function(jwt_payload, done) {
            User.findOne({ id: jwt_payload.id }, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        })
    );
};
