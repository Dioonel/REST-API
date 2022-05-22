const dotenv = require('dotenv').config();
const express = require('express');
const routerAPI = require('./routes/index');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');
const db = require('./db');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8080;

db.Promise = global.Promise;
db(process.env.DB_URI);

app.use(express.json());                                      // This middleware lets you make POST requests
app.use(express.static(__dirname + '/public'));                 // This middleware lets public files work
app.use(passport.initialize());
require('./utils/auth');
app.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile('main.html', {root: './'});
});

routerAPI(app);

app.use(logErrors);                                          // These middlewares MUST be after routerAPI(api)
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {console.log(`Listening port: ${port}`)});