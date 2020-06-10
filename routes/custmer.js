const express = require('express')
const joi = require('@hapi/joi');
const router = express.Router();
const { Customer , valdiate} = require('../models/customer')
require('express-async-errors');

router.get('/', async (req, res , next) => {
try{
    const customer = await Customer.find();
    res.send(customer)
}
catch(ex){
    next(ex);
}
});

router.post('/', async (req, res) => {
    // const {error} =valdiate(req.body);
    //    if(error) return res.status(404).send(error.details[0].message);
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    // const {error} =valdiate(req.body);
    // if(error) return res.status(404).send(error.details[0].message);
    let customer = await Customer.findByIdAndUpdate(req.params.id , {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    },{new : true});
    if (!customer) {   return res.status(404).send("customer not exist at system ");}

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    let customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) {
        res.status(404).send('sorry this product not found')
    }
    res.send(customer);
});

router.get('/:id', async (req, res) => {
    
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        return res.status(404).send("customer not exist at system ");
    }customer
    res.send(customer)
});

module.exports = router;