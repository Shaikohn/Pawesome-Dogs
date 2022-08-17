const axios = require("axios")
const { Router } = require('express');
const {Dog} = require ("../db")
const {Temperament} = require ("../db")

const router = Router();

router.get("/", async(req, res, next) => {
    const {name} = req.query;
    try {
        let dogPromiseApi = await axios.get(`https://api.thedogapi.com/v1/breeds`)
        let dogPromiseDb = await Dog.findAll({
        include: Temperament,
    })
        if (name) {
            Promise.all([dogPromiseApi, dogPromiseDb])
        .then((response) => {
            const [dogApi, dogDb] = response
            let filteredDogApi = dogApi.data.map((d) => {
                return {
                    id: d.id,
                    name: d.name,
                    image: d.image.url,
                    weight_min: d.weight.metric.slice(0, 2).trim(),
                    weight_max: d.weight.metric.slice(-2).trim(),
                    temperament: d.temperament
                }
            })
            let allDogs = [...filteredDogApi, ...dogDb]
            let dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
            console.log(dog)
            res.status(200).send(dog)
        })
        } else {
            Promise.all([dogPromiseApi, dogPromiseDb])
        .then((response) => {
            const [dogApi, dogDb] = response
            let filteredDogApi = dogApi.data.map((d) => {
                return {
                    id: d.id,
                    name: d.name,
                    image: d.image.url,
                    weight_min: d.weight.metric.slice(0, 2).trim(),
                    weight_max: d.weight.metric.slice(-2).trim(),
                    temperament: d.temperament
                }
            })
            let allDogs = [...filteredDogApi, ...dogDb]
            res.status(200).send(allDogs)
        })
        }
    }
    catch(error) {
        next(error)
    }
})

router.get("/:id", async (req, res, next) => {
    const {id} = req.params
    try {
        let dog
            let dogPromiseApi = await (axios.get(`https://api.thedogapi.com/v1/breeds`))
            let dogPromiseDb = await Dog.findAll({include: Temperament})
            Promise.all([dogPromiseApi, dogPromiseDb ])
        .then((response) => {
            const [dogApi, dogDb] = response
            let filteredDogApi = dogApi.data.map((d) => {

                return {
                    id: d.id,
                    name: d.name,
                    image: d.image.url,
                    weight_min: d.weight.metric.slice(0, 2).trim(),
                    weight_max: d.weight.metric.slice(-2).trim(),
                    height_min: d.height.metric.slice(0, 2).trim(),
                    height_max: d.height.metric.slice(4).trim(),
                    life_span_min: d.life_span.slice(0, 2).trim(),
                    life_span_max: d.life_span.slice(4, -6).trim(),
                    temperament: d.temperament
                }
            })
            let dogs = [...filteredDogApi, ...dogDb]
            dog = dogs.filter(d => d.id == id)
            res.status(200).send(dog)
        })
    }
    catch (error) {
        next(error)
    }
})  

router.post('/', async(req, res, next) => {
    const {name, height_min, height_max, weight_min, weight_max, temperament, life_span_min, life_span_max, image} = req.body;
    if(!name || !height_min || !height_max || !weight_min || !weight_max || !life_span_max || !life_span_min || !temperament || !image) {
    return res.status(400).send({msg: "Mandatory information is missing"})
    }
    try {
        const dog = await Dog.create(req.body)
        let tempDb = await Temperament.findAll({
        where: {id : temperament}
    })
    await dog.addTemperament(temperament)
    return res
        .status(201)
        .send({msg: "Breed created correctly"})
    } catch (error) {
        next(error)
    }
})

module.exports = router;

