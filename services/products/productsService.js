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
            let data = await store.get();

            if(filterInfo?.name){                                               // if(filterInfo && filterInfo.name) works too
                data = _.filter(data, (item) => {return item.name.toLowerCase().includes(filterInfo.name.toLowerCase())});
                console.log('Filter by name executed');
            }

            if(filterInfo?.price){
                if(filterInfo?.min_price){
                    data = _.filter(data, (item) => {return item.price >= parseInt(filterInfo.min_price)});
                    console.log('Filter by MIN price executed');
                }
                if(filterInfo?.max_price){
                    data = _.filter(data, (item) => {return item.price <= parseInt(filterInfo.max_price)}); 
                    console.log('Filter by MAX price executed');
                }
            }

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