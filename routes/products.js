const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/products.html');                               // HTML
});

router.post('/', (req, res) => {                                                     // POST
    const body = req.body;
    res.status(201).json({
        message: 'Created!',
        data: body,
    });
});


router.get('/:quantity', (req, res) => {                                             // GET
    const quantity = parseInt(req.params.quantity);
    let data = [];
    for (let i = 0; i < quantity ; i++){
        data.push({
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: faker.image.imageUrl(),
        })
    }
    res.status(200).json(data);
});


router.patch('/:id', (req, res) => {                                                 // PATCH
    const body = req.body;
    const id = req.params.id;
    res.status(200).json({
        message: 'Updated!',
        data: body,
        id: id,
    });
});


router.delete('/:id', (req, res) => {                                                 // DELETE
    const id = req.params.id;
    res.status(200).json({
        message: 'Deleted!',
        id: id,
    });
});


module.exports = router;