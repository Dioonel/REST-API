const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const boom = require('@hapi/boom');
const UsersService = require('./../../services/users/usersService');
const bcrypt = require('bcrypt');
const service = new UsersService();

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
    },
    async (username, password, done) => {
    try {
            const user = await service.find(username);                                              // Validates user existance
            if(!user[0]){
                done(boom.unauthorized('User not found'), false);
            }
            if(user[0]?.password){
                const isMatch = await bcrypt.compare(password, user[0].password);                   // Validates password

                if(!isMatch){
                    done(boom.unauthorized('Incorrect password'), false);
                }

                done(null, {message: 'Logged in!'});
            }
    } catch (err) {
        done(err, false);
    } 
}));