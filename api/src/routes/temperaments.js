const axios = require("axios")
const { Router } = require('express');
const router = Router();
const {Temperament} = require ("../db")

router.get("/", async (req, res, next) => {
    try {
        const all = (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data
        const findTemperaments = all.map(t => t.temperament)
        const joinTemperaments = findTemperaments.filter(r => r != null).join().split(",").join().split(",")

        let result = joinTemperaments.reduce((a, e) => {
            if(!a.find(d => d == e)) a.push(e)
            return a
        }, []);

        result = result.map(t => {return{name: t}})

        const allTemps = await Temperament.findAll()
    
        if(allTemps.length === 0) {
            await Temperament.bulkCreate(result)
        } 
        const temper = await Temperament.findAll()
        res.send(temper)
    }
    catch (error) {
        next(error)
    }
})  

module.exports = router;