const dotenv = require('dotenv').config();
const express = require('express');
const routerAPI = require('./routes/index');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');
const db = require('./db');

const app = express();
const port = 8080;

db.Promise = global.Promise;
db(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1v9n9.mongodb.net/main_db?retryWrites=true&w=majority`);

app.use(express.json());                                      // This middleware lets you make POST requests
app.use('/public', express.static('public'));                 // This middleware lets public files work

app.get('/', (req, res) => {
    res.sendFile('main.html', {root: './'});
});

routerAPI(app);

app.use(logErrors);                                          // These middlewares MUST be after routerAPI(api)
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {console.log(`Listening port: ${port}`)});
console.log(process.env);