const faker = require('faker');

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
            })
        }
    }

    create(product){
        this.products.push(product);
        return product;
    }

    find(){
        return this.products;
    }

    findOne(id){
        return this.products.find((item) => item.id == id);
    }

    delete(id){
        for(let i = 0; i < this.products.length; i++){
            if(this.products[i].id == id){
                this.products.splice(i, 1);
                return `Item deleted! ~=~=~=~=~ ID: ${id}`;
            }
        }
        return `Item not found.`;
    }
}

module.exports = ProductsService;