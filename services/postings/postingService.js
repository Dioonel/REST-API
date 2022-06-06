const boom = require('@hapi/boom');
const store = require('./postingStore');

const CommentsService = require('../comments/commentService');
const commentService = new CommentsService();

class PostingsService {

    async create(userId, data){
        if(!userId || !data){
            throw boom.badRequest("[Posting Service] - Can't post empty data.");
        }
        try{
            let myPost = {
                seller: userId,
                ...data
            }

            let newPost = await store.add(myPost);
            return newPost;
        } catch (err) {
            throw boom.conflict('[Posting Service] - Unexpected error.');
        }       
    }

    async find(limit, skip){                                                                                  // Get all posts
        try{
            if(!isNaN(parseInt(limit))){
                limit = parseInt(limit);                                                                      // Parsing limit if necessary
            } else {
                limit = null;
            }

            if(!isNaN(parseInt(skip))){
                skip = parseInt(skip);                                                                        // Parsing skip if necessary
            } else {
                skip = null;
            }

            console.log(limit, skip);
            return await store.get(limit, skip);
        } catch (err) {
            throw boom.conflict('[Posting Service] - Unexpected error.');
        }    
    }

    async findOne(id){
        try{
            if(!id){
                throw boom.conflict('[Posting Service] - No id provided.');
            }
            return await store.getOne(id);                                                              // Get a post by id
        } catch (err){
            throw boom.conflict('[Posting Service] - Unexpected error.');
        }
    } 

    async update(userId, postId, patch){
        try {
            if(!userId || !postId || !patch){
                throw boom.conflict("[Posting Service] - Can't post empty data.");
            }

            let post = await store.getOne(postId);
            if(userId == post?.seller?._id){                                                          // Validates user owning that post
                return await store.update(postId, patch);                                                   // Update a post by id
            } else {
                throw boom.unauthorized('[Posting Service] - You are not the owner of this post');
            }
        } catch (err){
            throw boom.conflict('[Posting Service] - Unexpected error.');
        }
    }

    async delete(userId, postId){
        try{
            if(!userId || !postId){
                throw boom.conflict("[Posting Service] - Can't post empty data.");
            }

            let post = await store.getOne(postId);
            if(userId == post?.seller?._id){                                                            // Validates user owning that post
                return await store.delete(id);                                                               // Delete a post by id
            } else {
                throw boom.unauthorized('[Posting Service] - You are not the owner of this post');
            } 
        } catch (err) {
            throw boom.conflict('[Posting Service] - Unexpected error');
        }
    }


////////////////////////////////////////////////////// POST - COMMENTS OPERATIONS //////////////////////////////////////////////////////////////


    async addCommentToPost(userId, postId, comment){
        try{
            let post = await store.getOne(postId);
            
            if(post?._id == postId){                                                              // Validates if the post exists or not
                return await commentService.create(userId, postId, comment);
            } else {
                throw boom.notFound("[Posting Service] - Can't push a comment if the post doesn't exist.");
            }
        } catch (err){
            throw boom.conflict('[Posting Service] - Unexpected error.');
        }
    }
}

module.exports = PostingsService;