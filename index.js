const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("main website");
});


app.get('/products', (req, res) => {
    res.send("products website");
});

app.get('/users', (req, res) => {
    res.send("users website");
})

app.get('/products/:quantity', (req, res) => {
    const quantity = parseInt(req.params.quantity);
    let data = [];
    for (let i = 0; i < quantity ; i++){
        data.push({
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: faker.image.imageUrl(),
        })
    }
    res.json(data || ":(")
});

app.get('/users/:quantity', (req, res) => {
    const quantity = parseInt(req.params.quantity);
    let data = [];
    for (let i = 0; i < quantity ; i++){
        data.push({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            gender: faker.name.gender(),
            job_area: faker.name.jobArea(),
            contact: faker.phone.phoneNumber(),
        })
    }
    res.json(data || ":(")
})

app.listen(port, () => {console.log(`Listening port: ${port}`)});