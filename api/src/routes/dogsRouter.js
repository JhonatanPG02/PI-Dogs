const express = require('express');
const router = express.Router()
const {Dog, Temperament} = require('../db')
const {getAllDogs} = require('./controllers')

router.get('/', async (req, res, next) => {
    try {
    const {name} = req.query
    const allDogs = await getAllDogs()
    if(name) {
        const dogByName = allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        dogByName.length ?
        res.send(dogByName) :
        res.status(404).send('no dog found')
    } else {
        res.json(allDogs) 
    }
    }catch(error){
        next(error)
    }
})


router.get('/:id', async (req, res, next) => {
    try{
    const {id} = req.params
    const allDogs = await getAllDogs()
    const dogById = allDogs.find(e => e.id == id)
    if(dogById) {
    res.json(dogById) 
    } else {
    res.status(404).send('the id does not exist')
    }
    }catch(error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try{
    const {name,
           image, 
           height_min, 
           height_max, 
           weight_min, 
           weight_max, 
           life_spanmin,
           life_spanmax, 
           temperaments} = req.body
    const createdDog = await Dog.create({name, 
                                        image,
                                        height_min, 
                                        height_max, 
                                        weight_min, 
                                        weight_max, 
                                        life_span: `${life_spanmin} - ${life_spanmax}`
                                        })
    const temperamentDB = await Temperament.findAll({
        where: {name: temperaments}
    })
    createdDog.addTemperament(temperamentDB)
    
    res.send('Dog created successfully!')
    }catch(error) {
        next(error)
    }
})


module.exports = router