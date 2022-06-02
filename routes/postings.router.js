const boom = require('@hapi/boom');
const express = require('express');
const PostingsService = require('../services/postings/postingService');
const service = new PostingsService();
const router = express.Router();

router.get('/', async (req, res, next) => {                                                         // GET all posts
    try {
        const posts = await service.find();
        res.json(posts);
    } catch(err){
        next(err);
    }
});

router.post('/', async (req, res, next) => {                                                        // POST (create a post)
    try {
        let body = req.body;
        body = await service.create(body);
        res.status(201).json({
            message: 'Post created!',
            data: body,
        });
    } catch(err){
        next(err);
    }
});

router.get('/:id', async(req, res, next) => {
    try{
        let id = req.params.id;
        let post = await service.findOne(id);
        res.json(post);
    } catch (err) {
        next(err);
    }
});

router.patch('/:id', async(req, res, next) => {
    try{
        let id = req.params.id;
        let body = req.body;
        let myPost = await service.update(id, body);
        res.json({
            message: 'Post updated!',
            data: myPost
        });
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async(req, res, next) => {
    try{
        let id = req.params.id;
        let data = await service.delete(id);
        res.json({
            message: 'Post deleted!',
            id,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;