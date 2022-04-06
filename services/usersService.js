const faker = require('faker');
const boom = require('@hapi/boom');

class UsersService {

    constructor(){
        this.users = []
        this.generate();
    }

    generate(){
        const limit = 50;
        for (let i = 0; i < limit; i++){
            this.users.push({
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                gender: faker.name.gender(),
                job_area: faker.name.jobArea(),
                contact: faker.phone.phoneNumber(),
                id: faker.datatype.uuid(),
            });
        }
    }

    create(user){
        try {
            this.users.push(user);
            return user;
        } catch (err) {
            throw boom.conflict('Please, try again later.');
        }       
    }

    find(){
        try {
            return this.users;
        } catch (err) {
            throw boom.conflict('Please, try again later.');
        }    
    }

    findOne(id){
        let user = this.users.find((person) => person.id == id);
        if (user){
            return user;
        }
        throw boom.notFound('User not found.');
    }

    delete(id){
        const index = this.users.findIndex((person) => person.id == id);
        if (index == -1){
            throw boom.notFound('User not found.');
        }
        try{
            this.users.splice(index, 1);
            return {message: 'User deleted!', id: id};
        } catch (err) {
            throw boom.conflict('There was an error while deleting.');
        }
    }

    //     for (let i = 0; i < this.users.length; i++){
    //         if(this.users[i].id == id){
    //             this.users.splice(i, 1);
    //             return `User deleted! ~=~=~=~=~ ID: ${id}`;
    //         }
    //     }
    //     return `User not found.`
    // }
}

module.exports = UsersService;