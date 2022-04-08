const express = require('express');
const ProductsService = require('../services/productsService');

const service = new ProductsService();
const router = express.Router();

//router.get('/', (req, res) => {
//    res.sendFile(__dirname + '/client/products.html');                               // HTML
//});

router.get('/', (req, res, next) => {                                                // GET all products
    try {
        const data = service.find();
        res.json(data);
    } catch (err){
        next(err);
    }
});

router.post('/', (req, res, next) => {                                                     // POST (create a product)
    try {
        let body = req.body;
        body = service.create(body)
        res.status(201).json({
            message: 'Created!',
            data: body,
        });
    } catch (err){
        next(err);
    }
});

router.get('/:id', (req, res, next) => {                                                  // GET product by id
    try {
        const id = req.params.id;
        const product = service.findOne(id);
        res.json(product);
    } catch (err){
        next(err);
    }
});

router.patch('/:id', (req, res, next) => {                                                     // PATCH, edit an item
    try {
        const body = req.body;
        const id = req.params.id;
        const item = service.update(id, body);
        res.json({
            message: 'Updated!',
            data: item,
        });
    } catch (err){
        next(err);
    }
});


router.delete('/:id', (req, res, next) => {                                                 // DELETE a product
    try {
        let id = req.params.id;
        id = service.delete(id);
        res.json({
            message: id,
        });
    } catch (err){
        next(err);
    }
});


module.exports = router;