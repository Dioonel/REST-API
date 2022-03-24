const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Soy la pagina principal")
});

app.get('/product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let ojo = [];
    for (let i = 0; i < id ; i++){
        ojo.push({
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: faker.image.imageUrl(),
        })
    }
    res.json(ojo || ":(")
})

app.get('/cositas', (req, res) => {
    const optional = req.query.sex;
    res.send(optional);
})

app.listen(port, () => {console.log(`Listening port: ${port}`)});