const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/products.html');
});


router.get('/:quantity', (req, res) => {
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


module.exports = router;