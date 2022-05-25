const store = require('./productsStore');
const boom = require('@hapi/boom');
const _ = require('lodash');

class ProductsService {

    async create(product){
        if(!product){
            throw boom.badRequest("Can't post empty data.");
        }
        try {
            return await store.add(product);
        } catch (err){
            throw boom.conflict('Please, try again later.');
        }   
    }

    async find(query){
        try {
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
            if(parseInt(query?.quantity)){
                filter = {...filter, quantity: parseInt(query.quantity)};
            }


            if(query?.sortBy){
                filter = {...filter, sortBy: query.sortBy};
            }
            if(query?.sortWay){
                if([1, -1, '1', '-1', 'asc', 'desc', 'ascending', 'descending'].includes(query.sortWay)){
                    filter = {...filter, sortWay: query.sortWay};
                }
            }

            let data = await store.get(filter);

            return data;
        } catch (err) {
            throw boom.conflict('Please, try again later.');
        }
    }

    async findOne(id){
        try{
            return await store.getOne(id);
        } catch (err){
            throw boom.notFound('Item not found.');
        }
    }

    async update(id, patch){
        try {
            return await store.update(id, patch);
        } catch (err){
            throw boom.badRequest('Invalid data.');
        }
    }

    async delete(id){
        try{
            return await store.delete(id);
        } catch (err) {
            throw boom.notFound('Item not found.');
        }
    }
}

module.exports = ProductsService;