const axios = require('axios')
const {Dog, Temperament} = require('../db')
const {API_KEY} = process.env



const getApiDogs = async () => {
    const apiDogsUrl = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data
    const apiDogs = apiDogsUrl.map(e => {
        return ({
            id: e.id,
            name: e.name,
            height_min: Number(e.height.metric.split("-")[0] || 0),
            height_max: Number(e.height.metric.split("-")[1] || NaN),
            weight_min: Number(e.weight.metric.split("-")[0] || 0),
            weight_max: Number(e.weight.metric.split("-")[1] || NaN),
            life_span: e.life_span.replace("years", ""),
            image: e.image.url,
            temperaments: e.temperament || 'Not temperaments'
        })
    })
    return apiDogs
}

const getBdDogs = async () => {
    const bdDogs = await Dog.findAll({                                                  
        include: {
            model: Temperament,                                                      //Incluyo Activity
            attributes: ['name'],
            through: {attributes: []}
            }
        })
    return bdDogs;
}

const getAllDogs = async () => {
    const getApi = await getApiDogs();
    const getBd = await getBdDogs();
    const newDB = getBd.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: e.image || 'https://img.freepik.com/foto-gratis/lindo-perrito-confundido-signos-interrogacion_488220-23427.jpg?w=740',
            height_min: e.height_min,
            height_max: e.height_max,
            weight_min: e.weight_min,
            weight_max: e.weight_max,
            life_span: e.life_span,
            createdInDb: e.createdInDb,
            temperaments: e.temperaments.map(e => e.name).join()
        }
    })
    const dogsTotal = getApi.concat(newDB)
    
    return dogsTotal
}

const getAllTemperaments = async () => {
    const infoApi = (await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;
    let temperaments = infoApi.map(e => e.temperament)
    let temps= temperaments.join().split(',')
    temps = temps.map(t=> t.trim()).sort()
    const set = new Set(temps)
    set.forEach(e => {
        if(e.length > 0) {
        Temperament.findOrCreate({
          where:{name: e}
      })
    }
    })
    const allTemperaments = await Temperament.findAll();
    return allTemperaments
}


module.exports={
    getAllDogs,
    getAllTemperaments
}