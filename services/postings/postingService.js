const boom = require('@hapi/boom');
const store = require('./postingStore');
const { toLower } = require('lodash');

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

    async find(query){
        try{
            let filter = null;

            if(query?.name){
                filter = {...filter, name: query.name};
            }
            if(query?.min_price){
                filter = {...filter, min_price: query.min_price};
            }
            if(query?.max_price){
                filter = {...filter, max_price: query.max_price}; 
            }

            if(!isNaN(parseInt(query?.limit))){
                filter = {...filter, limit: Math.abs(parseInt(query.limit))};                                   // Parsing limit if necessary
            }

            if(!isNaN(parseInt(query?.skip))){
                filter = {...filter, skip: Math.abs(parseInt(query.skip))};                                     // Parsing skip if necessary
            }


            if(query?.sortBy){
                if(['price', 'name'].includes(query.sortBy)){                                     // Only declaring sortBy if its a valid field
                    filter = {...filter, sortBy: query.sortBy};
                }
            }
            if(query?.sortWay){                                                                 // Only declaring sortWay for reverse operations
                if([-1, '-1', 'desc', 'descending'].includes(query.sortWay)){
                    filter = {...filter, sortWay: query.sortWay};
                }
            }

            let posts = await store.get(filter);                                                                       // Get all posts

            if(filter?.sortBy){
                posts.sort((a, b) => {
                    switch (filter.sortBy){
                        case 'price':                                                                                  // Sort by price case
                            return parseInt(a.product.price) - parseInt(b.product.price);
                            break;

                        case 'name':                                                                                   // Sort by name case
                            return String(toLower(a.title)).localeCompare(String(toLower(b.title)));
                            break;
                    }
                });
            }

            if(filter?.sortWay){                                                                                       // If sortWay, reverse()
                posts.reverse();
            }

            return posts;
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