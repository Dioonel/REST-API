const productsRouter = require("./products");
const usersRouter = require("./users");

function routerAPI(app){
    app.use('/products', productsRouter);
    app.use('/users', usersRouter);
}

module.exports = routerAPI;