const boom = require('@hapi/boom');
const UsersService = require('./usersService');
const jwt = require('jsonwebtoken');

const service = new UsersService();

class AuthService {
    
    signToken(user){
        const payload = {
            sub: user._id,
            role: user.role,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return token;
    }

}

module.exports = AuthService;