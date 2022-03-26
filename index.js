const express = require('express');
const routerAPI = require('./routes/index');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile('main.html', {root: './'});
});

routerAPI(app);

app.listen(port, () => {console.log(`Listening port: ${port}`)});