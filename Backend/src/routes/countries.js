const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/',async (req, res) => {
    try{
        const response = await axios.get(`${process.env.BASE_URL}/AvailableCountries`);
        res.json(response.data);
    }catch(error){
        console.log('Error al obtener los paises: ',error.message);
        res.status(500).json({error: `Error al intentar obtener los paises.`});
    }
});

router.get('/:countryCode', async(req, res) => {
    const countryCode = req.params;
    console.log(countryCode);
    try{
        const response = await axios.get(`${process.env.BASE_URL}/AvailableCountries`);
        const country = response.data.find(
            (item) => item.countryCode === countryCode || item.name === countryCode
        );

        if(!country)
        {
            return res.status(404).json({error: `No se encontro el pais solicitado: ${countryCode}`});
        }
        res.json(response.data);
    }catch(error){
        console.log('Error: ',error.message);
        res.status(500).json({error: `No se hallo el pais con el codigo ${req.params.countryCode}`})
    }
})

router.get('/border/:countryCode', async(req, res) => {
    try{
        console.log(req.params.countryCode);
        const response = await axios.get(`${process.env.BASE_URL}/CountryInfo/${req.params.countryCode}`);
        res.json(response.data);
    }catch(error){
        console.log('Error: ',error.message);
        res.status(500).json({error: `No se hallo el pais con el codigo ${req.params.countryCode}`})
    }
})

router.get('/flag/:countryCode', async(req, res) => {
    const { countryCode } = req.params;
    try{
        const response = await axios.get(`${process.env.POPULATION_FLAG_API}/flag/images`);
        const country = response.data.data.find(
            (item) => item.name === countryCode || item.iso2 === countryCode || item.iso3 === countryCode
        );

        if(!country)
        {
            return res.status(404).json({error: `No se encontro el pais solicitado: ${countryCode}`});
        }
        res.json({name: country.name, flag: country.flag});
    }catch(error){
        console.error('Error al obtener la bandera:', error.message);
        res.status(500).json({ error: 'Error al obtener la información del país' });
    }
})

router.get('/population/:countryName', async(req, res) => {
    const { countryName } = req.params;
    try{
        const response = await axios.get(`${process.env.POPULATION_FLAG_API}/population`);
        const country = response.data.data.find(
            (item) => item.code === countryName 
        );

        if(!country)
        {
            return res.status(404).json({error: `No se encontro el pais solicitado: ${countryName}`});
        }
        res.json({name: country.name, population: country.populationCounts});
    }catch(error){
        console.error('Error al obtener la poblacion:', error.message);
        res.status(500).json({ error: 'Error al obtener la información del país' });
    }
})

module.exports = router;