const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {                                                       // HTML
    res.sendFile(__dirname + '/client/users.html');
});


router.post('/', (req, res) => {                                                      // POST
    const body = req.body;
    res.status(201).json({
        message: 'Created!',
        data: body,
    });
});


router.get('/:quantity', (req, res) => {                                              // GET
    const quantity = parseInt(req.params.quantity);
    let data = [];
    for (let i = 0; i < quantity ; i++){
        data.push({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            gender: faker.name.gender(),
            job_area: faker.name.jobArea(),
            contact: faker.phone.phoneNumber(),
        });
    }
    res.status(200).json(data);
});


router.patch('/:id', (req, res) => {                                                   // PATCH
    const id = req.params.id;
    const body = req.body;
    res.status(200).json({
        message: 'Updated!',
        data: body,
        id,
    });
});


router.delete('/:id', (req, res) => {                                                  // DELETE
    const id = req.params.id;
    res.status(200).json({
        message: 'Deleted!',
        id: id,
    });
});


module.exports = router;