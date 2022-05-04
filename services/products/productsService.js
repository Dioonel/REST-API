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

    async find(filterInfo){
        try {
            let filter = null;   

            if(filterInfo?.name){                                               // if(filterInfo && filterInfo.name) works too
                filter = {...filter, name: filterInfo.name};
            }

            if(filterInfo?.min_price){
                filter = {...filter, min_price: filterInfo.min_price};
            }
            if(filterInfo?.max_price){
                filter = {...filter, max_price: filterInfo.max_price}; 
            }

            if(parseInt(filterInfo?.quantity)){
                filter = {...filter, quantity: parseInt(filterInfo.quantity)};
            }

            console.log(filter);
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