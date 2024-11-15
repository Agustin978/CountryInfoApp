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
    try{
        console.log(req.params.countryCode);
        const response = await axios.get(`${process.env.BASE_URL}/CountryInfo/${req.params.countryCode}`);
        res.json(response.data);
    }catch(error){
        console.log('Error: ',error.message);
        res.status(500).json({error: `No se hallo el pais con el codigo ${req.params.countryCode}`})
    }
})

module.exports = router;