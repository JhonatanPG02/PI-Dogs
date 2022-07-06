const express = require('express');
const router = express.Router()
const {Temperament} = require('../db')
const {getAllTemperaments} = require('./controllers')

router.get('/', async (req, res, next) => {
    try{
    const allTemperaments = await getAllTemperaments()
    res.json(allTemperaments)
    }catch(error) {
        next(error)
    }
})


module.exports = router