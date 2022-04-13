const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

    constructor(){
        this.products = [];
        this.generate();
    }

    generate(){
        const limit = 100;
        for (let i = 0; i < limit; i++){
            this.products.push({
                name: faker.commerce.productName(),
                price: faker.commerce.price(),
                image: faker.image.imageUrl(),
                id: faker.datatype.uuid(),
            });
        }
    }

    create(product){
        try {
            this.products.push(product);
            return product;
        } catch (err){
            throw boom.conflict('Please, try again later.');
        }
        
    }

    find(){
        try {
            return this.products;
        }
        catch (err) {
            throw boom.conflict('Please, try again later.');
        }
    }

    findOne(id){
        let item = this.products.find((item) => item.id == id);
        if (item){
            return item;
        }
        throw boom.notFound('Item not found.');
    }

    update(id, patch){
        const index = this.products.findIndex((item) => item.id == id);
        if (index == -1){
            throw boom.notFound('Item not found.');
        }
        try {
            const item = this.products[index];
            this.products[index] = {
            ...item,
            ...patch,
        };
        return this.products[index];
        } catch (err){
            throw boom.badRequest('Invalid syntax.');
        }
    }

    delete(id){
        const index = this.products.findIndex((item) => item.id == id);
        if (index == -1){
            throw boom.notFound('Item not found.');
        }
        try{
            this.products.splice(index, 1);
            return id;
        } catch (err) {
            throw boom.conflict('There was an error while deleting.');
        }
    }
}

module.exports = ProductsService;