const faker = require('faker');

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
        this.users.push(user);
        return user;
    }

    find(){
        return this.users;
    }

    findOne(id){
        return this.users.find((person) => person.id == id);
    }

    delete(id){
        for (let i = 0; i < this.users.length; i++){
            if(this.users[i].id == id){
                this.users.splice(i, 1);
                return `User deleted! ~=~=~=~=~ ID: ${id}`;
            }
        }
        return `User not found.`
    }
}

module.exports = UsersService;