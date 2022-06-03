const boom = require('@hapi/boom');
const express = require('express');
const passport = require('passport');
const PostingsService = require('../services/postings/postingService');
const service = new PostingsService();
const CommentsService = require('../services/comments/commentService');
const commentService = new CommentsService();
const router = express.Router();

router.get('/', async (req, res, next) => {                                                           // GET all posts
    try {
        const posts = await service.find();
        res.json(posts);
    } catch(err){
        next(err);
    }
});

router.post('/',
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {                                                                     // POST (create a post)
        try {
            let userId = req.user.sub;
            let body = req.body;
            let post = await service.create(userId, body);
            res.status(201).json({
                message: 'Post created!',
                data: post,
            });
        } catch(err){
            next(err);
        }
});

router.get('/:id', async(req, res, next) => {                                                         // GET one post (with detailed data)
    try{
        let id = req.params.id;
        let post = await service.findOne(id);
        res.json(post);
    } catch (err) {
        next(err);
    }
});

router.patch('/:id',
    passport.authenticate('jwt', {session: false}),
    async(req, res, next) => {                                                                          // PATCH a post
        try{
            let postId = req.params.id;
            let userId = req.user.sub;
            let patch = req.body;
            let post = await service.update(userId, postId, patch);
            res.json({
                message: 'Post updated!',
                data: post
            });
        } catch (err) {
            next(err);
        }
});

router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    async(req, res, next) => {                                                                           // DELETE a post    
        try{
            let userId = req.user.sub;
            let postId = req.params.id;
            let response = await service.delete(userId, postId);
            res.json({
                message: 'Post deleted!',
                id,
            });
        } catch (err) {
            next(err);
        }
});

router.post('/:id',
    passport.authenticate('jwt', {session: false}),
    async(req, res, next) => {                                                                           // CREATE a comment in a post
        try{
            let postId = req.params.id;
            let userId = req.user.sub
            let comment = req.body;
            let commentedPost = await service.addCommentToPost(userId, postId, comment);
            res.json(commentedPost);
        } catch (err){
            next(err)
        }
    });

router.delete('/comment/:commentId',
    passport.authenticate('jwt', {session: false}),
    async(req, res, next) => {                                                                              // DELETE a comment 
        try{
            let commentId = req.params.commentId;
            let userId = req.user.sub;
            let response = await commentService.delete(userId, commentId);
            res.json(response);
        } catch (err){
            next(err);
        }
});

router.patch('/comment/:commentId',
    passport.authenticate('jwt', {session: false}),
    async(req, res, next) => {                                                                               // UPDATE a comment
        try{
            let commentId = req.params.commentId;
            let userId = req.user.sub;
            let body = req.body;
            let response = await commentService.update(userId, commentId, body);
            res.json(response);
        } catch (err){
            next(err);
        }
})

module.exports = router;