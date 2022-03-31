const productsIndexRouter = require("./productsIndex.router");
const productsRouterAPI = require("./productsAPI.router");
const usersIndexRouter = require("./usersIndex.router");
const usersRouterAPI = require("./usersAPI.router");

function routerAPI(app){
    app.use('/products', productsIndexRouter);
    app.use('/api/products', productsRouterAPI);
    app.use('/users', usersIndexRouter);
    app.use('/api/users', usersRouterAPI);
}

module.exports = routerAPI;