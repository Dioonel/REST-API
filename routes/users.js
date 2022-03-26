const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/users.html');
})


router.get('/:quantity', (req, res) => {
    const quantity = parseInt(req.params.quantity);
    let data = [];
    for (let i = 0; i < quantity ; i++){
        data.push({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            gender: faker.name.gender(),
            job_area: faker.name.jobArea(),
            contact: faker.phone.phoneNumber(),
        })
    }
    res.json(data || ":(")
})


module.exports = router;