const express = require('express');
const routerAPI = require('./routes/index');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');
//const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.json());                                      // Esta linea es un middleware, permite que POST funcione
app.use('/public', express.static('public'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('main.html', {root: './'});
});

routerAPI(app);

app.use(logErrors);                                          // These middlewares MUST be after routerAPI(api)
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {console.log(`Listening port: ${port}`)});