const boom = require('@hapi/boom');
const express = require('express');
const ProductsService = require('../services/products/productsService');

const service = new ProductsService();
const router = express.Router();

router.get('/', async (req, res, next) => {                                                      // GET all products
    try {
        const data = await service.find(req.query);
        res.json(data);
    } catch (err){
        next(err);
    }
});

router.post('/', async (req, res, next) => {                                                     // POST (create a product)
    try {
        let body = req.body;
        body = await service.create(body);
        res.status(201).json({
            message: 'Item created!',
            data: body,
        });
    } catch (err){
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {                                                  // GET product by id
    try {
        const id = req.params.id;
        const product = await service.findOne(id);
        if (product == null || product == undefined){
            throw boom.notFound('Item not found.');
        } else {       
            res.json(product);
        }
    } catch (err){
        next(err);
    }
});

router.patch('/:id', async (req, res, next) => {                                                     // PATCH, edit an item
    try {
        const body = req.body;
        const id = req.params.id;
        const item = await service.update(id, body);
        res.json({
            message: 'Item updated!',
            data: item,
        });
    } catch (err){
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {                                                 // DELETE a product
    try {
        let id = req.params.id;
        id = await service.delete(id);
        if (id == null || id == undefined){
            res.json({message: 'Item not found.'});
        } else {
            res.json({
                message: 'Item deleted.',
                id: id
            });
        }
    } catch (err){
        next(err);
    }
});


module.exports = router;