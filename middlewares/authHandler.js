const boom = require('@hapi/boom');
const { toLower } = require('lodash');

function checkRoles(roles){
    return (req, res, next) => {
        const user = req.user;
        if (toLower(roles).includes(toLower(user.role))){
            next();
        } else {
            throw boom.unauthorized('Insufficient permissions');
        }
    }
}

module.exports = checkRoles;