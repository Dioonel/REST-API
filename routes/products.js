const express = require('express');
const ProductsService = require('./../services/products');

const service = new ProductsService();
const router = express.Router();

//router.get('/', (req, res) => {
//    res.sendFile(__dirname + '/client/products.html');                               // HTML
//});

router.get('/', (req, res) => {                                                      // GET all products
    const data = service.find();
    res.json(data);
});

router.post('/', (req, res) => {                                                     // POST (create a product)
    let body = req.body;
    body = service.create(body)
    res.status(201).json({
        message: 'Created!',
        data: body,
    });
});

router.get('/:id', (req, res) => {                                                  // GET product by id
    const id = req.params.id;
    const product = service.findOne(id);
    res.json(product);
});

router.patch('/:id', (req, res) => {                                                 // PATCH (not supported rn)
    const body = req.body;
    const id = req.params.id;
    res.json({
        message: 'Updated!',
        data: body,
        id: id,
    });
});


router.delete('/:id', (req, res) => {                                                 // DELETE a product
    let id = req.params.id;
    id = service.delete(id);
    res.json({
        message: id,
    });
});


module.exports = router;