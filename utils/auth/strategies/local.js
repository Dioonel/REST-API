const Strategy = require('passport-local').Strategy;
const boom = require('@hapi/boom');
const UsersService = require('./../../../services/users/usersService');
const bcrypt = require('bcrypt');
const service = new UsersService();

const options = {
    usernameField: 'username',
    passwordField: 'password'
}

const LocalStrategy = new Strategy(options, async (username, password, done) => {
    try {
            const user = await service.findUsername(username);                                              // Validates user existence
            if(!user){
                done(boom.unauthorized('User not found'), false);
            }
            if(user?.password){
                const isMatch = await bcrypt.compare(password, user.password);                              // Validates password

                if(!isMatch){
                    done(boom.unauthorized('Incorrect password'), false);
                }

                done(null, {status: 200, user: user});
            }
    } catch (err) {
        done(err, false);
    } 
});

module.exports = LocalStrategy;